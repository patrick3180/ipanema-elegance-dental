import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import type { ProteseSeletorOption } from "@/config/especialistaProteseV2Config";

interface ProteseSeletorProps {
  title: string;
  subtitle: string;
  options: ProteseSeletorOption[];
  footnote: string;
  whatsappNumber: string;
}

/**
 * Seletor "Qual prótese para o seu caso?" — resolve a indecisão (1,48 págs/sessão)
 * e qualifica o lead. Cada card abre o WhatsApp com o assunto pré-preenchido e
 * dispara tracking completo (dataLayer + gtag + GCLID webhook) com label único.
 *
 * Visual: editorial/discreto (sem ícones de "app") — fio dourado + tipografia serifada.
 */
const ProteseSeletor: React.FC<ProteseSeletorProps> = ({
  title,
  subtitle,
  options,
  footnote,
  whatsappNumber,
}) => {
  const handleClick = async (option: ProteseSeletorOption) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: `Seletor Protese - ${option.label}`,
        protese_assunto: option.assunto,
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          if (process.env.NODE_ENV === "development") {
            console.log(`Google Ads conversion tracked - Seletor ${option.label}`);
          }
        },
      });
    }

    await sendGCLIDToWebhook(option.webhookSource);

    const message = `Olá! Vi a página de prótese e tenho interesse em ${option.label.toLowerCase()}. Gostaria de agendar uma consulta para entender o que é possível no meu caso.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Qual prótese para o seu caso">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">{title}</h2>
            <p className="text-base md:text-lg text-[#5C5647] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex flex-col bg-[#FAF7F2] rounded-2xl border border-[#B3955F]/20 shadow-[0_4px_16px_rgba(56,31,71,0.06)] overflow-hidden"
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Fio dourado — marcador discreto no lugar do ícone */}
                  <span className="block w-10 h-px bg-[#B3955F] mb-5" aria-hidden="true" />

                  <h3 className="text-xl font-bold text-[#381F47] font-serif mb-1">
                    {option.label}
                  </h3>
                  <p className="text-sm font-semibold text-[#8B7340] mb-4">{option.tag}</p>

                  <p className="text-[15px] text-[#333333] leading-relaxed mb-4">
                    {option.description}
                  </p>

                  <p className="mt-auto inline-flex items-start gap-2 text-sm text-[#381F47] font-medium bg-white rounded-lg px-3 py-2 border border-[#B3955F]/20">
                    <span className="text-[#B3955F] text-[8px] mt-1.5">●</span>
                    {option.highlight}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleClick(option)}
                  className="m-7 mt-0 inline-flex items-center justify-center gap-2 text-white rounded-[10px] px-5 py-3.5 text-sm font-bold transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transform hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg, #25D366 0%, #20BD5A 100%)" }}
                >
                  <MessageCircle size={18} />
                  {option.ctaLabel}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-[#6B6B6B] italic max-w-2xl mx-auto mt-10">{footnote}</p>
        </div>
      </div>
    </section>
  );
};

export default ProteseSeletor;
