
import React, { lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";

// Above-the-fold: eager (critical for LCP)
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostImage from "@/components/blog/BlogPostImage";
import BlogPostLoading from "@/components/blog/BlogPostLoading";
import BlogPostError from "@/components/blog/BlogPostError";

// Below-the-fold: lazy-loaded to reduce critical JS bundle (~40-60KB saved)
// Sprint 7: Blog LCP optimization — GSC flagged 32 blog URLs with LCP > 2.5s
const BlogContent = lazy(() => import("@/components/BlogContent"));
const BlogPostTags = lazy(() => import("@/components/blog/BlogPostTags"));
const BlogPostShare = lazy(() => import("@/components/blog/BlogPostShare"));
const BlogPostRelated = lazy(() => import("@/components/blog/BlogPostRelated"));
const QuickAnswerBox = lazy(() => import('@/components/blog/QuickAnswerBox'));
const KeyTakeaways = lazy(() => import('@/components/blog/KeyTakeaways'));
const ComparisonTable = lazy(() => import('@/components/blog/ComparisonTable'));
const FAQSectionBlog = lazy(() => import('@/components/blog/FAQSectionBlog'));
const PeopleAlsoAsk = lazy(() => import('@/components/blog/PeopleAlsoAsk'));
const AuthorBio = lazy(() => import('@/components/blog/AuthorBio'));
const BlogCTA = lazy(() => import('@/components/blog/BlogCTA'));
const BlogStickyWhatsApp = lazy(() => import('@/components/blog/BlogStickyWhatsApp'));


const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>(); // Fixed: changed from postSlug to slug
  const navigate = useNavigate();


  // Fetch the current blog post
  const {
    data: post,
    isLoading,
    error
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => {
      if (!slug) {
        throw new Error('No slug provided');
      }
      return getBlogPostBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 60000,
    refetchOnMount: true
  });

  // Fetch all posts for related posts, but with lower priority
  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => getAllBlogPosts(),
    staleTime: 300000
  });

  React.useEffect(() => {
    if (!slug) {
      navigate("/blog");
      return;
    }

    if (!isLoading && !post && slug) {
      navigate("/blog");
    }
  }, [post, slug, navigate, isLoading]);


  if (isLoading) {
    return (
      <PageLayout>
        <BlogPostLoading />
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <BlogPostError />
      </PageLayout>
    );
  }

  if (!post) {
    return null;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  const hasContent = post.content && post.content.length > 10;

  // Create structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.imageUrl || "https://lovable.dev/opengraph-image-p98pqg.png",
    // Referencia a Person canônica (definida em AuthorSchema.tsx via GlobalSchemas)
    "author": { "@id": "https://dracarlachristoph.com/#author" },
    // Referencia a Organization canônica (definida em GlobalSchemas.tsx)
    "publisher": { "@id": "https://dracarlachristoph.com/#organization" },
    "datePublished": post.publishedAt || post.date,
    "dateModified": post.updatedAt || post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dracarlachristoph.com/blog/${slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags?.join(", ") || `${post.category}, odontologia, saúde bucal, dentista Ipanema`,
    "wordCount": post.content?.length || 0,
    "inLanguage": "pt-BR",
    "isAccessibleForFree": "True",
    "about": {
      "@type": "Thing",
      "name": post.category,
      "description": `Artigo sobre ${post.category.toLowerCase()} em odontologia`
    }
  };

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dracarlachristoph.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://dracarlachristoph.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title
      }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema for Google Search */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <SEOHead
        title={`${post.title} | Blog Dental Dra. Carla Christoph`}
        description={post.metaDescription || post.excerpt}
        keywords={`${post.tags?.join(", ") || post.category}, blog odontologia, dicas saúde bucal, dentista Ipanema, Dra. Carla Christoph`}
        ogImage={post.imageUrl}
        ogType="article"
        canonicalUrl={`https://dracarlachristoph.com/blog/${slug}`}
        author={post.author || "Dra. Carla Christoph"}
        publishedTime={post.publishedAt || post.date}
        modifiedTime={post.updatedAt || post.date}
        articleTags={post.tags}
        structuredData={structuredData}
      />
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            <BlogPostHeader post={post} />

            <BlogPostImage imageUrl={post.imageUrl} title={post.title} />

            {/* Sprint 7: Below-the-fold content wrapped in Suspense for lazy loading */}
            <Suspense fallback={<div className="min-h-[200px]" />}>
              {/* Quick Answer Box */}
              {post.quickAnswer && (
                <div className="max-w-4xl mx-auto">
                  <QuickAnswerBox answer={post.quickAnswer} />
                </div>
              )}

              {/* Key Takeaways */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <KeyTakeaways takeaways={post.keyTakeaways} />
                </div>
              )}

              <BlogPostTags tags={post.tags} />

              {/* Content */}
              <div className="max-w-3xl mx-auto mb-16">
                {hasContent ? (
                  <BlogContent
                    content={post.content}
                    className="prose prose-lg"
                  />
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-dental-beige/30 rounded-lg p-6 mb-6">
                      <p className="text-dental-gray mb-4">{post.excerpt}</p>
                      <p className="text-sm text-dental-gray/70">
                        O conteúdo completo está sendo carregado. Se o problema persistir,
                        entre em contato conosco.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Blog CTA - WhatsApp conversion */}
              <div className="max-w-3xl mx-auto">
                <BlogCTA category={post.category} />
              </div>

              {/* Comparison Table */}
              {post.comparisonTable && post.comparisonTable.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <ComparisonTable data={post.comparisonTable} />
                </div>
              )}

              {/* People Also Ask */}
              {post.peopleAlsoAsk?.questions && post.peopleAlsoAsk.questions.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <PeopleAlsoAsk
                    questions={post.peopleAlsoAsk.questions}
                    onQuestionClick={(question) => {
                      const contentElement = document.querySelector('.blog-content');
                      if (contentElement) {
                        const top = contentElement.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
              )}

              {/* FAQ Section */}
              {post.faqStructured && post.faqStructured.length > 0 && (
                <div className="max-w-4xl mx-auto">
                  <FAQSectionBlog faqs={post.faqStructured} />
                </div>
              )}

              {/* Author Bio - Always show with fallback data */}
              <div className="max-w-4xl mx-auto">
                <AuthorBio
                  bio={post.authorBio || "Cirurgiã-dentista com mais de 20 anos de experiência em Ipanema, Rio de Janeiro. Especialista em Prótese Dentária e Implantodontia (CRO-RJ 27.509), com 8 anos como dentista militar na Odontoclínica Central da Marinha."}
                  author={post.author || "Dra. Carla Christoph"}
                />
              </div>

              <BlogPostShare post={post} />

              <BlogPostRelated relatedPosts={relatedPosts} />
            </Suspense>
          </div>
        </section>
        {/* Sticky WhatsApp CTA for mobile */}
        <Suspense fallback={null}>
          <BlogStickyWhatsApp />
        </Suspense>
      </PageLayout>
    </>
  );
};

export default BlogPost;
