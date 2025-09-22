
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import ComparisonTable from '@/components/blog/ComparisonTable';
import FAQSectionBlog from '@/components/blog/FAQSectionBlog';
import PeopleAlsoAsk from '@/components/blog/PeopleAlsoAsk';
import AuthorBio from '@/components/blog/AuthorBio';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>(); // Fixed: changed from postSlug to slug
  const navigate = useNavigate();
  
  // Debug logging for route parameters
  React.useEffect(() => {
    console.log('BlogPost component mounted with params:', { slug });
    console.log('Current URL:', window.location.href);
  }, [slug]);
  
  // Fetch the current blog post
  const { 
    data: post, 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => {
      console.log(`Fetching blog post with slug: "${slug}"`);
      if (!slug) {
        console.error('No slug provided to getBlogPostBySlug');
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
    queryFn: () => {
      console.log('Fetching all blog posts for related posts');
      return getAllBlogPosts();
    },
    staleTime: 300000
  });
  
  // Enhanced error handling and navigation
  React.useEffect(() => {
    if (!slug) {
      console.error('No slug in URL parameters, redirecting to blog page');
      navigate("/blog");
      return;
    }
    
    if (!isLoading && !post && slug) {
      console.log(`Post not found for slug: ${slug}, redirecting to blog page`);
      navigate("/blog");
    }
  }, [post, slug, navigate, isLoading]);

  // Debug logging for post data
  React.useEffect(() => {
    if (post) {
      console.log('Blog post loaded successfully:', {
        title: post.title,
        slug: post.slug,
        hasContent: !!post.content,
        contentLength: post.content?.length || 0,
        imageUrl: post.imageUrl,
        category: post.category
      });
    }
  }, [post]);

  // Debug logging for errors
  React.useEffect(() => {
    if (error) {
      console.error('Error loading blog post:', error);
    }
  }, [error]);

  // Loading state
  if (isLoading) {
    console.log('BlogPost: Rendering loading state');
    return (
      <PageLayout>
        <BlogPostLoading />
      </PageLayout>
    );
  }

  // Error state
  if (error || !post) {
    console.log('BlogPost: Rendering error state', { error: !!error, post: !!post });
    return (
      <PageLayout>
        <BlogPostError />
      </PageLayout>
    );
  }

  if (!post) {
    console.log('BlogPost: No post data, returning null');
    return null;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  console.log('BlogPost: Related posts found:', relatedPosts.length);

  // Check if content exists
  const hasContent = post.content && post.content.length > 10;
  console.log('BlogPost: Content check:', { hasContent, contentLength: post.content?.length });

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

  console.log('BlogPost: Rendering complete blog post');

  return (
    <>
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
                      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

            {/* Author Bio */}
            {post.authorBio && (
              <div className="max-w-4xl mx-auto">
                <AuthorBio 
                  bio={post.authorBio}
                  author={post.author}
                />
              </div>
            )}

            <BlogPostShare post={post} />

            <BlogPostRelated relatedPosts={relatedPosts} />
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default BlogPost;
