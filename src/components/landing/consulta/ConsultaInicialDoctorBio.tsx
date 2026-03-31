import React from 'react';
import UltraOptimizedPicture from '@/components/performance/UltraOptimizedPicture';

const ConsultaInicialDoctorBio: React.FC = () => {
  const credentials = [
    'CRO-RJ 27.509',
    'Especialista em Prótese',
    'Implantodontia',
    '20+ Anos de Experiência',
  ];

  return (
    <section className="bg-white py-16 lg:py-20" aria-label="Sobre a Dra. Carla Christoph">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-[0_6px_24px_rgba(56,31,71,0.1)]">
                <UltraOptimizedPicture
                  src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                  alt="Dra. Carla Christoph — Especialista em Prótese e Implantodontia"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#381F47] font-serif">
                  Dra. Carla Christoph
                </h2>
                <p className="text-sm text-[#B3955F] font-medium mt-1">
                  CRO-RJ 27.509 · Especialista em Prótese e Implantodontia
                </p>
              </div>

              <p className="text-[#333333] leading-relaxed text-base">
                Com mais de 20 anos de experiência clínica em Ipanema, a Dra. Carla conduz cada
                consulta com atenção ao detalhe e comunicação transparente. Seu atendimento é
                particular e com número reduzido de pacientes por dia — para que cada pessoa
                receba o tempo que seu caso requer.
              </p>

              {/* Credential Pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {credentials.map((cred, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-[#381F47]/5 text-[#381F47] text-xs font-medium px-3 py-1.5 rounded-full border border-[#381F47]/10"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialDoctorBio;
