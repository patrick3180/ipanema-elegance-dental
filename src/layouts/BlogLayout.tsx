import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import "@/blog.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * BlogLayout - Scopes React Query to blog pages only
 *
 * PERFORMANCE OPTIMIZATION:
 * - React Query (46.8 KB gzipped) only loads on /blog routes
 * - Landing pages and service pages don't load this dependency
 * - Reduces bundle size by ~47KB on non-blog pages
 */
const BlogLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};

export default BlogLayout;
