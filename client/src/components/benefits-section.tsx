import { useTranslation } from "react-i18next";

export function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: "fa-bolt",
      iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      cardBg: "bg-gradient-to-br from-yellow-50 to-orange-50",
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      icon: "fa-chart-line",
      iconBg: "bg-gradient-to-br from-blue-500 to-purple-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-purple-50",
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      icon: "fa-lock",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      cardBg: "bg-gradient-to-br from-green-50 to-emerald-50",
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      icon: "fa-headset",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
      cardBg: "bg-gradient-to-br from-pink-50 to-rose-50",
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`${benefit.cardBg} rounded-xl p-6 border-2 border-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
              data-testid={`benefit-card-${idx}`}
            >
              <div className={`w-14 h-14 ${benefit.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                <i className={`fas ${benefit.icon} text-white text-2xl`}></i>
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
