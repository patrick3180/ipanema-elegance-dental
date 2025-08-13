import React from "react";
import { MapPin, Phone, Clock, Shield } from "lucide-react";

interface LandingFooterProps {
  doctorName: string;
  clinicName: string;
  phoneNumber: string;
}

const LandingFooter = ({ doctorName, clinicName, phoneNumber }: LandingFooterProps) => {
  return (
    <footer className="bg-dental-purple text-white py-16">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Clinic Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-semibold mb-4">
                {clinicName}
              </h3>
              <p className="text-white/80 mb-4">
                {doctorName} - CRO-RJ 12345
              </p>
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <MapPin size={16} />
                <span className="text-sm">Ipanema, Rio de Janeiro</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 mb-2">
                <Phone size={16} />
                <span className="text-sm">{phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock size={16} />
                <span className="text-sm">Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
              </div>
            </div>
            
            {/* Services */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-semibold mb-4">
                Especialidades
              </h3>
              <ul className="space-y-2 text-white/80">
                <li>Lentes de Contato Dental</li>
                <li>Implantes Dentários</li>
                <li>Clareamento Dental</li>
                <li>Harmonização Facial</li>
                <li>Ortodontia Invisível</li>
              </ul>
            </div>
            
            {/* Trust & Security */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-semibold mb-4">
                Confiança & Segurança
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <span className="text-white/80 text-sm">Protocolos de Segurança</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">CFO</span>
                  </div>
                  <span className="text-white/80 text-sm">Registrado no CFO</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-dental-gold rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">15+</span>
                  </div>
                  <span className="text-white/80 text-sm">Anos de Experiência</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm text-center md:text-left">
                © 2024 {clinicName}. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-white/60 text-sm">
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;