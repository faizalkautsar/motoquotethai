import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShieldCheck, Shield, Car } from "lucide-react";

interface CoverageCardsProps {
  onSelectCoverage: (type: string) => void;
}

export function CoverageCards({ onSelectCoverage }: CoverageCardsProps) {
  const { t } = useTranslation();

  const coverages = [
    {
      type: "type1",
      title: t('type1'),
      subtitle: "Type 1 Insurance",
      Icon: ShieldCheck,
      recommended: true,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "Authorized repair shop", available: true },
      ],
      price: "฿15,000",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      iconColor: "text-white",
      borderColor: "border-blue-500",
      accentColor: "text-blue-600",
    },
    {
      type: "type2",
      title: t('type2'),
      subtitle: "Type 2 Insurance",
      Icon: Shield,
      recommended: false,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "General repair shop", available: false },
      ],
      price: "฿9,000",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-500",
      iconColor: "text-white",
      borderColor: "border-green-400",
      accentColor: "text-green-600",
    },
    {
      type: "type3",
      title: t('type3'),
      subtitle: "Type 3 Third Party",
      Icon: Car,
      recommended: false,
      features: [
        { text: "Third-party liability only", available: true },
        { text: "No own damage", available: false },
        { text: "No fire & theft", available: false },
        { text: "Budget friendly", available: true },
      ],
      price: "฿3,500",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      iconColor: "text-white",
      borderColor: "border-purple-400",
      accentColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {t('coverageTitle')}
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t('coverageSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coverages.map((coverage) => (
            <Card
              key={coverage.type}
              className={`${coverage.recommended ? 'border-2 border-primary shadow-lg' : 'border border-border'} hover:shadow-xl transition-all cursor-pointer group bg-white`}
              data-testid={`card-coverage-${coverage.type}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <coverage.Icon className="w-8 h-8 text-accent" />
                  {coverage.recommended && (
                    <span className="relative px-3 py-1.5 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white text-xs font-semibold rounded-full shadow-lg overflow-hidden before:absolute before:inset-0 before:rounded-full before:p-[1.5px] before:bg-gradient-to-r before:from-yellow-400 before:via-amber-400 before:to-yellow-500 before:-z-10">
                      <span className="relative z-10">{t('recommended')}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-primary mb-2">
                  {coverage.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{coverage.subtitle}</p>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-3 mb-6">
                  {coverage.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <i className={`fas ${feature.available ? 'fa-check-circle text-accent' : 'fa-times-circle text-muted-foreground/50'} mt-0.5`}></i>
                      <span className={feature.available ? 'text-foreground' : 'text-muted-foreground line-through'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="text-sm text-muted-foreground mb-2">{t('startingFrom')}</div>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold text-primary">{coverage.price}</span>
                    <span className="text-muted-foreground ml-2 mb-1">{t('perYear')}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => onSelectCoverage(coverage.type)}
                  variant={coverage.recommended ? "default" : "outline"}
                  className="w-full"
                  data-testid={`button-select-${coverage.type}`}
                >
                  {t('selectPlan')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
