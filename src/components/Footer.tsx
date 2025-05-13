
import React from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dental-purple text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display mb-4">Dra. Carla Christoph</h3>
            <p className="text-white/70 mb-4">
              Odontologia estética de excelência em Ipanema, focada em resultados naturais e atendimento personalizado.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dracarlachristoph/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-dental-gold/70 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/dracarlachristoph"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-dental-gold/70 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-dental-gold/70 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display mb-4">Navegação</h3>
            <ul className="space-y-2">
              {["Início", "Sobre", "Tratamentos", "Blog", "Depoimentos", "Contato"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-white/70 hover:text-dental-gold transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-display mb-4">Contato</h3>
            <address className="not-italic text-white/70 space-y-2">
              <p>Rua Visconde de Pirajá, 550 - Sala 1107</p>
              <p>Ipanema, Rio de Janeiro - RJ</p>
              <p>CEP: 22410-901</p>
              <p className="mt-3">
                <a 
                  href="tel:+552137387909" 
                  className="hover:text-dental-gold transition-colors"
                >
                  (21) 3738-7909
                </a>
              </p>
              <p>
                <a 
                  href="tel:+5521993304045" 
                  className="hover:text-dental-gold transition-colors"
                >
                  (21) 99330-4045
                </a>
              </p>
              <p>
                <a 
                  href="mailto:contato@dracarlachristoph.com" 
                  className="hover:text-dental-gold transition-colors"
                >
                  contato@dracarlachristoph.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="text-center text-white/70 text-sm">
          <p>&copy; {currentYear} Dra. Carla Christoph - Todos os direitos reservados.</p>
          <p className="mt-2">
            <a href="/politica-de-privacidade" className="hover:text-dental-gold transition-colors">Política de Privacidade</a>
            {" • "}
            <a href="/termos-de-uso" className="hover:text-dental-gold transition-colors">Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
