import React, { ReactNode } from "react";

export interface PainPointItem {
  icon: ReactNode;
  strong: string;
  description: string;
  borderColor?: string;
}

export interface PainPointCallout {
  icon: ReactNode;
  title: string;
  text: string;
}

export interface EmpatheticPainPointsProps {
  title?: string;
  painPoints: PainPointItem[];
  conclusion?: ReactNode;
  callout?: PainPointCallout;
}

const EmpatheticPainPoints = ({
  title = "Você se identifica com alguma dessas situações?",
  painPoints,
  conclusion,
  callout,
}: EmpatheticPainPointsProps) => {
  const borderColors = [
    "border-dental-purple",
    "border-dental-gold",
    "border-dental-purple-soft",
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-dental-beige/20 via-white to-dental-beige/10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dental-purple mb-10 text-center">
          {title}
        </h2>

        <div className="space-y-5">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={`group flex items-start gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 ${
                point.borderColor || borderColors[index % borderColors.length]
              } shadow-soft hover:shadow-elegant transition-all duration-300`}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-purple/10 flex items-center justify-center group-hover:bg-dental-purple/20 transition-colors">
                {point.icon}
              </div>
              <div>
                <strong className="block text-dental-purple font-semibold mb-1">
                  {point.strong}
                </strong>
                <span className="text-dental-gray leading-relaxed">
                  {point.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {conclusion && (
          <p className="text-center text-dental-gray mt-10 text-lg leading-relaxed">
            {conclusion}
          </p>
        )}

        {callout && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white p-6 rounded-xl border-2 border-dental-gold shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dental-gold/15 flex items-center justify-center">
                  {callout.icon}
                </div>
                <div>
                  <p className="text-dental-purple font-semibold mb-2">
                    {callout.title}
                  </p>
                  <p className="text-dental-gray leading-relaxed text-sm">
                    {callout.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmpatheticPainPoints;
