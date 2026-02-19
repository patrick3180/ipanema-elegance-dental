import React from "react";
import { Award, Users, Calendar, Star } from "lucide-react";

interface StatItem {
    icon: React.ReactNode;
    value: string;
    label: string;
}

const stats: StatItem[] = [
    {
        icon: <Calendar className="w-5 h-5 text-dental-gold" />,
        value: "20+",
        label: "Anos de Experiência",
    },
    {
        icon: <Users className="w-5 h-5 text-dental-gold" />,
        value: "4.000+",
        label: "Pacientes Atendidos",
    },
    {
        icon: <Award className="w-5 h-5 text-dental-gold" />,
        value: "CRO-RJ",
        label: "27.509",
    },
    {
        icon: <Star className="w-5 h-5 text-dental-gold fill-dental-gold" />,
        value: "4.9 ★",
        label: "Avaliação Google",
    },
];

const StatsBar = () => {
    return (
        <section className="bg-dental-purple/5 border-y border-dental-purple/10" aria-label="Estatísticas da clínica">
            <div className="container-custom py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 justify-center"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-dental-purple leading-tight">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-dental-gray leading-tight">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
