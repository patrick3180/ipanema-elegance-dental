import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

// Static preview of recent blog articles — these match the top blog posts
const blogPreviews = [
  {
    slug: "odontologia-digital-scanner-intraoral-futuro",
    title: "Odontologia Digital: Como o iTero Element 5D Transforma Tratamentos",
    excerpt:
      "Descubra como a tecnologia de escaneamento digital 3D está revolucionando a forma como planejamos e executamos tratamentos dentários.",
    category: "Tecnologia",
    readTime: "5 min",
    image: "/blog/odontologia-digital.webp",
  },
  {
    slug: "lentes-de-contato-dental-guia-completo",
    title: "Lentes de Contato Dental: Guia Completo para um Sorriso Perfeito",
    excerpt:
      "Tudo que você precisa saber sobre lentes de contato dental — indicações, processo, cuidados e quanto tempo duram.",
    category: "Estética",
    readTime: "7 min",
    image: "/blog/lentes-contato.webp",
  },
  {
    slug: "implantes-dentarios-mitos-verdades",
    title: "Implantes Dentários: Mitos e Verdades que Todo Paciente Deve Saber",
    excerpt:
      "Dói? Quanto tempo dura? Qualquer pessoa pode fazer? Respondemos as dúvidas mais comuns sobre implantes dentários.",
    category: "Implantes",
    readTime: "6 min",
    image: "/blog/implantes.webp",
  },
];

const BlogPreview = () => {
  return (
    <section className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            Blog
          </p>
          <h2 className="heading-lg mb-4">
            Dicas e Informações sobre Saúde Bucal
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Conteúdo preparado pela Dra. Carla Christoph para ajudar você a
            entender melhor sua saúde bucal e tomar decisões informadas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPreviews.map((post, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 150}
              threshold={0.1}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-dental-purple/5">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width="400"
                        height="250"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-dental-purple/20" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-dental-gold bg-dental-gold/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-dental-gray">
                        {post.readTime} de leitura
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-semibold text-dental-purple mb-2 group-hover:text-dental-gold transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-dental-gray leading-relaxed mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center text-sm font-medium text-dental-gold group-hover:text-dental-gold-dark transition-colors duration-300">
                      Ler artigo
                      <ArrowRight
                        size={14}
                        className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-dental-purple hover:text-dental-gold font-medium transition-colors duration-300"
          >
            Ver todos os artigos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
