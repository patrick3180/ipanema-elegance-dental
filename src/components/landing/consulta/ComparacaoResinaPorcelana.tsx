import React from 'react';
import { Clock, Droplet, Layers, CalendarDays, Wrench, Wallet, Gem } from 'lucide-react';

interface CriterioRow {
  icon: React.ReactNode;
  criterio: string;
  resina: string;
  porcelana: string;
}

// Dados técnicos consolidados da página de serviço (LentesEFacetas) e das configs existentes.
// Comparativo de investimento é QUALITATIVO (sem cifras) — permitido pelo CRO.
const linhas: CriterioRow[] = [
  { icon: <Layers size={18} />, criterio: 'Material', resina: 'Resina composta nanoparticulada', porcelana: 'Porcelana de alta translucidez' },
  { icon: <Clock size={18} />, criterio: 'Durabilidade', resina: '5 a 8 anos', porcelana: '15 a 20 anos' },
  { icon: <Droplet size={18} />, criterio: 'Manchamento', resina: 'Pode manchar com o tempo', porcelana: 'Não mancha' },
  { icon: <CalendarDays size={18} />, criterio: 'Nº de sessões', resina: '1 a 2 (resultado rápido)', porcelana: '2 a 3 (15 a 20 dias)' },
  { icon: <Wrench size={18} />, criterio: 'Reparos', resina: 'Permite reparos pontuais', porcelana: 'Substituição, não reparo pontual' },
  { icon: <Wallet size={18} />, criterio: 'Investimento', resina: 'Mais acessível', porcelana: 'Maior — pensado para o longo prazo' },
  { icon: <Gem size={18} />, criterio: 'Naturalidade', resina: 'Muito boa', porcelana: 'Translucidez superior' },
];

const ComparacaoResinaPorcelana: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-16 lg:py-24" aria-label="Comparação entre resina e porcelana">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              Lente de Contato Dental: Resina × Porcelana
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
              Os dois materiais deixam o sorriso natural e fecham diastemas. A diferença está nos detalhes abaixo —
              e a indicação certa para o seu caso é definida na consulta.
            </p>
          </div>

          {/* Tabela (desktop) */}
          <div className="hidden md:block overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(56,31,71,0.08)] bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-sm font-semibold text-[#6B6B6B] uppercase tracking-wide p-5 w-1/3">
                    Critério
                  </th>
                  <th className="text-left text-base font-bold text-[#381F47] p-5 w-1/3 bg-[#B3955F]/10">
                    Faceta de Resina
                  </th>
                  <th className="text-left text-base font-bold text-[#381F47] p-5 w-1/3 bg-[#381F47]/[0.06]">
                    Lente de Porcelana
                  </th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((linha, i) => (
                  <tr key={linha.criterio} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]/60'}>
                    <td className="p-5 align-top">
                      <span className="flex items-center gap-2 font-semibold text-[#381F47] text-[15px]">
                        <span className="text-[#B3955F]">{linha.icon}</span>
                        {linha.criterio}
                      </span>
                    </td>
                    <td className="p-5 align-top text-[#333333] text-[15px] bg-[#B3955F]/[0.04]">{linha.resina}</td>
                    <td className="p-5 align-top text-[#333333] text-[15px] bg-[#381F47]/[0.03]">{linha.porcelana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards empilhados (mobile) */}
          <div className="md:hidden space-y-4">
            {linhas.map((linha) => (
              <div key={linha.criterio} className="bg-white rounded-xl shadow-[0_4px_16px_rgba(56,31,71,0.08)] p-5">
                <div className="flex items-center gap-2 font-semibold text-[#381F47] text-[15px] mb-3">
                  <span className="text-[#B3955F]">{linha.icon}</span>
                  {linha.criterio}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#B3955F]/[0.08] p-3">
                    <p className="text-xs font-bold text-[#381F47] mb-1">Resina</p>
                    <p className="text-[13px] text-[#333333] leading-snug">{linha.resina}</p>
                  </div>
                  <div className="rounded-lg bg-[#381F47]/[0.05] p-3">
                    <p className="text-xs font-bold text-[#381F47] mb-1">Porcelana</p>
                    <p className="text-[13px] text-[#333333] leading-snug">{linha.porcelana}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quando cada material é a melhor escolha (educativo, sem links de desvio) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 border-t-4 border-[#B3955F]/60 shadow-[0_4px_16px_rgba(56,31,71,0.06)]">
              <h3 className="text-xl font-bold text-[#381F47] font-serif mb-3">Quando a resina costuma ser a melhor escolha</h3>
              <ul className="space-y-2 text-[#333333] text-[15px] leading-relaxed">
                <li>• Você quer resultado mais rápido, em 1 ou 2 sessões.</li>
                <li>• Busca um investimento mais acessível neste momento.</li>
                <li>• Casos de ajustes pontuais de formato, cor ou pequenos espaços.</li>
                <li>• Permite ajustes e reparos pontuais ao longo do tempo.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-7 border-t-4 border-[#381F47]/50 shadow-[0_4px_16px_rgba(56,31,71,0.06)]">
              <h3 className="text-xl font-bold text-[#381F47] font-serif mb-3">Quando a porcelana costuma ser a melhor escolha</h3>
              <ul className="space-y-2 text-[#333333] text-[15px] leading-relaxed">
                <li>• Você quer máxima durabilidade — 15 a 20 anos.</li>
                <li>• Não quer se preocupar com manchas de café, vinho ou cigarro.</li>
                <li>• Busca translucidez superior e estabilidade de cor a longo prazo.</li>
                <li>• Casos que pedem mudança estética mais ampla e duradoura.</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-[#6B6B6B] italic max-w-2xl mx-auto">
            A escolha ideal depende do seu caso. Na consulta, a Dra. Carla avalia e recomenda a melhor opção para você —
            e o Test Drive do Sorriso ajuda a decidir com segurança.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparacaoResinaPorcelana;
