import React, { useEffect, useRef, useState } from "react";
import { Calendar, Users, Award, Star } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Calendar className="w-5 h-5" />,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    icon: <Users className="w-5 h-5" />,
    value: 4000,
    suffix: "+",
    label: "Patients Treated",
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: 27509,
    suffix: "",
    label: "CRO-RJ",
  },
  {
    icon: <Star className="w-5 h-5" />,
    value: 5.0,
    suffix: " ★",
    label: "Google Rating",
  },
];

function useCountUp(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const isDecimal = end % 1 !== 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isDecimal) {
        setCount(parseFloat((eased * end).toFixed(1)));
      } else {
        setCount(Math.floor(eased * end));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

function StatCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isCRO = stat.label === "CRO-RJ";
  const count = useCountUp(stat.value, 1800, isCRO ? false : visible);

  const formatValue = () => {
    if (isCRO) {
      return stat.value.toLocaleString("en-US");
    }
    if (stat.value >= 1000) {
      return count.toLocaleString("en-US");
    }
    return count;
  };

  return (
    <div ref={ref} className="flex items-center gap-3 justify-center">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dental-gold/15 flex items-center justify-center text-dental-gold transition-transform duration-300 group-hover:scale-110">
        {stat.icon}
      </div>
      <div>
        <p className="text-lg md:text-xl font-semibold text-dental-purple leading-tight font-display">
          {formatValue()}
          {stat.suffix}
        </p>
        <p className="text-xs text-dental-gray leading-tight">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

const EnStatsBar = () => {
  return (
    <section
      className="bg-white/80 backdrop-blur-sm border-y border-dental-purple/10"
      aria-label="Clinic statistics"
    >
      <div className="container-custom py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <StatCounter stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnStatsBar;
