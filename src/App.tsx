
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
import WhatsAppPopup from "./components/WhatsAppPopup";
import LentesEFacetas from "./pages/LentesEFacetas";
import ClareamentoDental from "./pages/ClareamentoDental";
import ProteseDentaria from "./pages/ProteseDentaria";
import ImplantesDentarios from "./pages/ImplantesDentarios";
import ClinicaGeralPrevencao from "./pages/ClinicaGeralPrevencao";
import RestaureacoesEsteticas from "./pages/RestaureacoesEsteticas";
import TratamentoDeCanal from "./pages/TratamentoDeCanal";
import SaudeDaGengiva from "./pages/SaudeDaGengiva";

// Add type declaration for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

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
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/lentes-de-contato-dental-e-facetas-de-porcelana" element={<LentesEFacetas />} />
          <Route path="/clareamento-dental" element={<ClareamentoDental />} />
          <Route path="/protese-dentaria" element={<ProteseDentaria />} />
          <Route path="/implantes-dentarios" element={<ImplantesDentarios />} />
          <Route path="/clinica-geral-e-prevencao" element={<ClinicaGeralPrevencao />} />
          <Route path="/restauracoes-esteticas" element={<RestaureacoesEsteticas />} />
          <Route path="/tratamento-de-canal" element={<TratamentoDeCanal />} />
          <Route path="/saude-da-gengiva" element={<SaudeDaGengiva />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
