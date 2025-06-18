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

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const navigate = useNavigate();
  
  // Fetch the current blog post
  const { 
    data: post, 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['blogPost', postSlug],
    queryFn: () => getBlogPostBySlug(postSlug || ""),
    enabled: !!postSlug,
    staleTime: 60000,
    refetchOnMount: true
  });

  // Fetch all posts for related posts, but with lower priority
  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getAllBlogPosts,
    staleTime: 300000
  });
  
  // If post not found and not loading, navigate to blog page
  React.useEffect(() => {
    if (!isLoading && !post && postSlug) {
      console.log(`Post not found for slug: ${postSlug}, redirecting to blog page`);
      navigate("/blog");
    }
  }, [post, postSlug, navigate, isLoading]);

  // Debug logging for post data
  React.useEffect(() => {
    if (post) {
      console.log('Blog post loaded:', {
        title: post.title,
        hasContent: !!post.content,
        contentLength: post.content?.length || 0,
        imageUrl: post.imageUrl
      });
    }
  }, [post]);

  // Loading state
  if (isLoading) {
    return (
      <PageLayout>
        <BlogPostLoading />
      </PageLayout>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <PageLayout>
        <BlogPostError />
      </PageLayout>
    );
  }

  if (!post) return null;

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // Check if content exists
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
      "url": "https://dracarlachristoph.com.br/sobre"
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
      "@id": `https://dracarlachristoph.com.br/blog/${postSlug}`
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

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog Dental Dra. Carla Christoph`}
        description={post.metaDescription || post.excerpt}
        keywords={`${post.tags?.join(", ") || post.category}, blog odontologia, dicas saúde bucal, dentista Ipanema, Dra. Carla Christoph`}
        ogImage={post.imageUrl}
        ogType="article"
        canonicalUrl={`https://dracarlachristoph.com.br/blog/${postSlug}`}
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

            <BlogPostShare post={post} />

            <BlogPostRelated relatedPosts={relatedPosts} />
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default BlogPost;
