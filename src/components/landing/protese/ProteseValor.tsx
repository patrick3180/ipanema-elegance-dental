import React from "react";
import type { ProteseValueProp } from "@/config/especialistaProteseV2Config";

interface ProteseValorProps {
  title: string;
  subtitle: string;
  items: ProteseValueProp[];
}

/**
 * Reenquadre de valor vs. âncora "dentadura barata" — sem preço, sem promessa de anos.
 * Visual: numerais serifados dourados (editorial/premium) no lugar de ícones.
 */
const ProteseValor: React.FC<ProteseValorProps> = ({ title, subtitle, items }) => {
  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24" aria-label="Por que a prótese de especialista é diferente">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">{title}</h2>
            <p className="text-base md:text-lg text-[#5C5647] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border-t-2 border-[#B3955F]/40 shadow-[0_4px_16px_rgba(56,31,71,0.06)]"
              >
                <span className="block font-serif text-3xl text-[#B3955F] leading-none mb-4" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-[#381F47] font-serif mb-3">{item.title}</h3>
                <p className="text-[15px] text-[#333333] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProteseValor;
