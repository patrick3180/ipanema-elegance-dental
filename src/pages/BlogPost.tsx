
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import BlogContent from "@/components/BlogContent";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostImage from "@/components/blog/BlogPostImage";
import BlogPostTags from "@/components/blog/BlogPostTags";
import BlogPostShare from "@/components/blog/BlogPostShare";
import BlogPostRelated from "@/components/blog/BlogPostRelated";
import BlogPostLoading from "@/components/blog/BlogPostLoading";
import BlogPostError from "@/components/blog/BlogPostError";
import QuickAnswerBox from '@/components/blog/QuickAnswerBox';
import KeyTakeaways from '@/components/blog/KeyTakeaways';
import ComparisonTable from '@/components/blog/ComparisonTable';
import FAQSectionBlog from '@/components/blog/FAQSectionBlog';
import PeopleAlsoAsk from '@/components/blog/PeopleAlsoAsk';
import AuthorBio from '@/components/blog/AuthorBio';
import BlogCTA from '@/components/blog/BlogCTA';
import BlogStickyWhatsApp from '@/components/blog/BlogStickyWhatsApp';

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
    "author": {
      "@type": "Person",
      "name": post.author || "Dra. Carla Christoph",
      "jobTitle": "Cirurgiã-Dentista Especialista",
      "url": "https://dracarlachristoph.com/sobre"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Clínica Dra. Carla Christoph",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lovable.dev/opengraph-image-p98pqg.png"
      }
    },
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
          </div>
        </section>
        {/* Sticky WhatsApp CTA for mobile */}
        <BlogStickyWhatsApp />
      </PageLayout>
    </>
  );
};

export default BlogPost;
