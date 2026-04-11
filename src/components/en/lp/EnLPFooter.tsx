import React from "react";

const EnLPFooter: React.FC = () => {
  return (
    <footer className="bg-dental-purple/95 py-8 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/60 text-xs leading-relaxed">
          Dr. Carla Christoph — CRO-RJ 27.509 • Specialist in Prosthodontics and Implant Dentistry
        </p>
        <p className="text-white/40 text-xs mt-2">
          Rua Visconde de Pirajá, 550 — Suite 1107, Ipanema, Rio de Janeiro, RJ 22410-002
        </p>
        <p className="text-white/30 text-[10px] mt-4">
          © {new Date().getFullYear()} Dr. Carla Christoph. All rights reserved. CRO-RJ 27.509.
        </p>
      </div>
    </footer>
  );
};

export default EnLPFooter;
