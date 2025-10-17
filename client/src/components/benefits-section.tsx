import { useTranslation } from "react-i18next";
import { Zap, TrendingUp, Lock, Headphones } from "lucide-react";

export function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    {
      Icon: Zap,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      Icon: TrendingUp,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      Icon: Lock,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      Icon: Headphones,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {t('benefitsTitle')}
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t('benefitsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all"
              data-testid={`benefit-card-${idx}`}
            >
              <benefit.Icon className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
