import { useTranslation } from "react-i18next";

export function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: "fa-bolt",
      color: "primary",
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      icon: "fa-chart-line",
      color: "secondary",
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      icon: "fa-lock",
      color: "accent",
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      icon: "fa-headset",
      color: "primary",
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-border shadow-md hover:shadow-lg transition-shadow"
              data-testid={`benefit-card-${idx}`}
            >
              <div className={`w-14 h-14 bg-${benefit.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                <i className={`fas ${benefit.icon} text-${benefit.color} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
