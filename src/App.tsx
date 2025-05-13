
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetail from "./pages/ServiceDetail";
import DifferentialsPage from "./pages/DifferentialsPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/servicos/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/diferenciais" element={<DifferentialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postSlug" element={<BlogPost />} />
          <Route path="/contato" element={<ContactPage />} />
          {/* Add routes for privacy policy and terms of use */}
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
