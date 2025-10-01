import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
      icon: "fa-shield-alt",
      recommended: true,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "Authorized repair shop", available: true },
      ],
      price: "฿15,000",
      bgColor: "bg-primary/5",
      iconColor: "text-primary",
      borderColor: "border-primary",
    },
    {
      type: "type2",
      title: t('type2'),
      subtitle: "Type 2 Insurance",
      icon: "fa-shield",
      recommended: false,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "General repair shop", available: false },
      ],
      price: "฿9,000",
      bgColor: "bg-secondary/5",
      iconColor: "text-secondary",
      borderColor: "border-border",
    },
    {
      type: "type3",
      title: t('type3'),
      subtitle: "Type 3 Third Party",
      icon: "fa-car",
      recommended: false,
      features: [
        { text: "Third-party liability only", available: true },
        { text: "No own damage", available: false },
        { text: "No fire & theft", available: false },
        { text: "Budget friendly", available: true },
      ],
      price: "฿3,500",
      bgColor: "bg-muted/5",
      iconColor: "text-muted",
      borderColor: "border-border",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('coverageTitle')}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t('coverageSubtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coverages.map((coverage) => (
            <Card
              key={coverage.type}
              className={`border-2 ${coverage.borderColor} shadow-md hover:shadow-xl transition-all cursor-pointer group`}
              data-testid={`card-coverage-${coverage.type}`}
            >
              <CardHeader className={coverage.bgColor}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${coverage.bgColor} rounded-lg flex items-center justify-center`}>
                    <i className={`fas ${coverage.icon} ${coverage.iconColor} text-xl`}></i>
                  </div>
                  {coverage.recommended && (
                    <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      {t('recommended')}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {coverage.title}
                </h3>
                <p className="text-sm text-muted mb-4">{coverage.subtitle}</p>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-3 mb-6">
                  {coverage.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <i className={`fas ${feature.available ? 'fa-check-circle text-secondary' : 'fa-times-circle text-muted/50'} mt-0.5`}></i>
                      <span className={feature.available ? 'text-foreground' : 'text-muted line-through'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="text-sm text-muted mb-2">{t('startingFrom')}</div>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold text-primary">{coverage.price}</span>
                    <span className="text-muted ml-2 mb-1">{t('perYear')}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  onClick={() => onSelectCoverage(coverage.type)}
                  className={`w-full ${coverage.recommended ? 'bg-primary hover:bg-primary/90' : 'bg-white border-2 border-primary text-primary hover:bg-primary/5'}`}
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
