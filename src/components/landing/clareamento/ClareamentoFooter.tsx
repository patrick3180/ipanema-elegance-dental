import React from 'react';
import { MapPin, Phone, Smartphone, Mail, Clock, CheckCircle, CreditCard } from 'lucide-react';

const ClareamentoFooter: React.FC = () => {
  return (
    <footer className="bg-[#381F47] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Coluna 1 - Clínica */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6">Clínica</h3>
              <div className="space-y-3">
                <p className="font-semibold text-lg">Dra. Carla Christoph</p>
                <p className="text-white/80">CRO-RJ 27509</p>
                <p className="text-white/80">Especialista em Prótese e Implantodontia</p>
                
              </div>
            </div>

            {/* Coluna 2 - Contato */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#B3955F] mt-1 flex-shrink-0" />
                  <div>
                    <p>Rua Visconde de Pirajá, 550 - Sala 1107</p>
                    <p className="text-white/80">Ipanema, Rio de Janeiro - RJ</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#B3955F]" />
                  <span>(21) 3738-7909</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-[#B3955F]" />
                  <span>(21) 99330-4045</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#B3955F]" />
                  <span>contato@dracarlachristoph.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#B3955F]" />
                  <span>Seg-Sex: 9h às 19h</span>
                </div>
              </div>
            </div>

            {/* Coluna 3 - Atendimento */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6">Atendimento</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#B3955F]" />
                  <span>Atendimento Particular</span>
                </div>
                
                
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#B3955F]" />
                  <span>Materiais Premium</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#B3955F]" />
                  <span>Consultas Sem Pressa</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#B3955F]" />
                  <span>Resultado Natural</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#B3955F]" />
                  <span>Acompanhamento Contínuo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 pt-8">
            {/* Copyright */}
            <div className="text-center text-white/60">
              <p>&copy; 2025 Dra. Carla Christoph - Todos os direitos reservados</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default ClareamentoFooter;