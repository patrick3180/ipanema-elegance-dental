import React from "react";

interface ProteseSolucaoProps {
  title: string;
  description: string;
  problems: string[];
}

/**
 * Bloco "O seu caso tem solução" — reenquadra a dor em algo tratável.
 * Versão da Prótese V2: sem ícones de "app" (pedido do Patrick) — marcador
 * é um losango dourado discreto + fio dourado à esquerda. Editorial/premium.
 */
const ProteseSolucao: React.FC<ProteseSolucaoProps> = ({ title, description, problems }) => {
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="O seu caso tem solução">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">{title}</h2>
            {description && (
              <p className="text-base md:text-lg text-[#5C5647] leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] border-l-2 border-[#B3955F]/60 rounded-lg p-5 flex items-start gap-3"
              >
                <span
                  className="flex-shrink-0 mt-1.5 w-2 h-2 rotate-45 bg-[#B3955F]"
                  aria-hidden="true"
                />
                <p className="text-[#333333] leading-relaxed text-[15px]">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProteseSolucao;
