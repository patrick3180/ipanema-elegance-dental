import React from "react";
import OptimizedImage from "@/components/OptimizedImage";

const ConsultaInicialDoctorBio: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-dental-beige/40" aria-label="Sobre a Dra. Carla Christoph">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
          {/* Foto (mantida) */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-dental-gold/20 to-dental-purple/10 rounded-2xl rotate-2 scale-[1.03]" />
              <OptimizedImage
                src="/lovable-uploads/dra-carla-mesa-consultorio.webp"
                alt="Dra. Carla Christoph em seu consultório em Ipanema — Especialista em Prótese e Implantodontia"
                className="relative rounded-2xl shadow-elegant w-60 md:w-full object-cover"
                width={280}
                height={350}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium">
              Sua Dentista
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple">
              Dra. Carla Christoph
            </h2>
            <p className="text-xs text-dental-gray uppercase tracking-wide">
              CRO-RJ 27.509 • Especialista em Prótese Dentária e em Implantodontia
            </p>

            <div className="space-y-3 text-sm text-dental-gray leading-relaxed">
              <p>
                Com mais de <strong>20 anos de experiência clínica em Ipanema</strong>, a Dra. Carla é especialista em <strong>Prótese Dentária e em Implantodontia</strong> — as duas áreas no centro da reabilitação do sorriso.
              </p>
              <p>
                Sua formação inclui <strong>8 anos como dentista militar na Odontoclínica Central da Marinha</strong>, em paralelo à prática particular — experiência que trouxe disciplina, precisão e compromisso com a segurança do paciente.
              </p>
              <p>
                No diagnóstico, conta com o <strong>scanner iTero Element 5D</strong> e registro digital quando indicado, para um exame preciso. E você resolve tudo em um só lugar: cada etapa do seu tratamento acontece no mesmo consultório, com o <strong>acompanhamento e a supervisão da Dra. Carla do início ao fim</strong> — sem precisar pular de endereço em endereço a cada especialidade.
              </p>
            </div>

            {/* Credenciais */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Especialista em Prótese Dentária",
                "Especialista em Implantodontia",
                "20+ Anos",
                "8 anos na Marinha",
                "iTero Element 5D",
              ].map((credential) => (
                <span
                  key={credential}
                  className="text-[11px] font-medium text-dental-purple bg-white border border-dental-purple/10 rounded-full px-3 py-1"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialDoctorBio;
