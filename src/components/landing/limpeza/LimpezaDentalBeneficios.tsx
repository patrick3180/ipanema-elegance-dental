import React from 'react';

interface LimpezaDentalBeneficiosProps {
  title: string;
  description: string;
  problems: string[];
}

const LimpezaDentalBeneficios: React.FC<LimpezaDentalBeneficiosProps> = ({
  title,
  description,
  problems
}) => {
  const benefitCards = [
    {
      title: "Prevenção Inteligente",
      description: problems[0],
      icon: "💰",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Saúde Integral", 
      description: problems[1],
      icon: "❤️",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      title: "Confiança Renovada",
      description: problems[2], 
      icon: "😊",
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              {description}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitCards.map((card, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#381F47]">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technology Highlight */}
          <div className="mt-16 bg-gradient-to-br from-[#381F47] to-[#4A2B5A] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold font-serif">
                  Limpeza com Tecnologia Ultrassônica: Conforto e Eficiência Superior
                </h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Vibrações de 25.000-30.000 Hz que fragmentam o tártaro sem traumatizar seus tecidos
                </p>
                <p className="text-white/80 leading-relaxed">
                  Diferente das raspagens manuais tradicionais que causam desconforto, nossa tecnologia ultrassônica utiliza microvibrações suaves que quebram e removem depósitos de biofilme e cálculo dental. O resultado? Uma limpeza 30-40% mais rápida, significativamente mais confortável e com acesso superior a áreas de difícil alcance.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-center">Comparativo de Métodos</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-red-300">Limpeza Tradicional</h5>
                      <div className="space-y-2 text-white/70">
                        <p>❌ Pressão manual dolorosa</p>
                        <p>⏱️ 45-60 minutos</p>
                        <p>📍 Acesso limitado</p>
                        <p>🩸 Possível sangramento</p>
                        <p>😣 Sensibilidade pós-procedimento</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold text-green-300">Nossa Tecnologia</h5>
                      <div className="space-y-2 text-white/70">
                        <p>✅ Vibração suave e confortável</p>
                        <p>⚡ 30-40 minutos</p>
                        <p>🎯 Alcança todas as áreas</p>
                        <p>💙 Mínimo trauma tecidual</p>
                        <p>😌 Conforto imediato</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimpezaDentalBeneficios;