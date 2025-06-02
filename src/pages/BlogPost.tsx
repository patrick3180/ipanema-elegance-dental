
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
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

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // Check if content exists
  const hasContent = post.content && post.content.length > 10;

  return (
    <PageLayout>
      {/* SEO metadata */}
      <Helmet>
        <title>{post.title} | Blog Dental</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
      </Helmet>

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
  );
};

export default BlogPost;
