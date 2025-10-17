import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ComparisonTable } from "./comparison-table";
import type { QuoteResult } from "@/types/quote";
import { ShieldCheck, Shield, Car } from "lucide-react";

interface QuoteResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: QuoteResult | null;
}

export function QuoteResults({ open, onOpenChange, quote }: QuoteResultsProps) {
  const { t } = useTranslation();
  const [paymentPeriod, setPaymentPeriod] = useState<"yearly" | "monthly">("yearly");

  if (!quote) return null;

  const quotes = [
    {
      type: "type1",
      title: t('type1'),
      subtitle: "Type 1 Insurance",
      Icon: ShieldCheck,
      price: quote.type1Price,
      monthlyPrice: Math.round(quote.type1Price / 11),
      recommended: true,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "Flood coverage included", available: true },
        { text: "Authorized repair shop", available: true },
      ],
    },
    {
      type: "type2",
      title: t('type2'),
      subtitle: "Type 2 Insurance",
      Icon: Shield,
      price: quote.type2Price,
      monthlyPrice: Math.round(quote.type2Price / 11),
      recommended: false,
      features: [
        { text: "Own damage coverage", available: true },
        { text: "Third-party liability", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "General repair shop", available: false },
      ],
    },
    {
      type: "type3",
      title: t('type3'),
      subtitle: "Type 3 Third Party",
      Icon: Car,
      price: quote.type3Price,
      monthlyPrice: Math.round(quote.type3Price / 11),
      recommended: false,
      features: [
        { text: "Third-party liability only", available: true },
        { text: "No own damage", available: false },
        { text: "No fire & theft", available: false },
        { text: "Budget friendly", available: true },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Header Section */}
        <div className="bg-white px-6 sm:px-8 py-6 border-b border-border">
          <div className="flex items-start justify-between mb-6">
            <div>
              <DialogTitle className="text-3xl font-bold text-primary mb-2">
                {t('quoteResultsTitle')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-lg">
                {t('quoteResultsSubtitle')}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-primary"
              data-testid="button-close-results"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>

          {/* Quote Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Vehicle</div>
              <div className="font-semibold text-foreground">{quote.carBrand} {quote.carModel} {quote.carYear}</div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-1 font-medium">License</div>
              <div className="font-semibold text-foreground">{quote.licensePlate}</div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Customer</div>
              <div className="font-semibold text-foreground">{quote.firstName} {quote.lastName}</div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-1 font-medium">Date</div>
              <div className="font-semibold text-foreground">{new Date(quote.createdAt).toLocaleDateString('th-TH')}</div>
            </div>
          </div>
        </div>

        {/* Payment Period Toggle */}
        <div className="px-6 sm:px-8 py-6 bg-background border-b border-border">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-foreground font-medium">Payment:</span>
            <div className="inline-flex rounded-lg border border-border p-1 bg-white">
              <Button
                variant={paymentPeriod === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPaymentPeriod("yearly")}
                data-testid="button-payment-yearly"
              >
                {t('yearly')}
              </Button>
              <Button
                variant={paymentPeriod === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPaymentPeriod("monthly")}
                data-testid="button-payment-monthly"
              >
                {t('monthly')}
              </Button>
            </div>
          </div>
        </div>

        {/* Quote Cards */}
        <div className="px-6 sm:px-8 py-8 bg-background">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {quotes.map((coverage) => {
              const displayPrice = paymentPeriod === "yearly" ? coverage.price : coverage.monthlyPrice;
              const period = paymentPeriod === "yearly" ? "/year" : "/month";

              return (
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
                        <span className="text-3xl font-bold text-primary">฿{displayPrice.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-2 mb-1">{period}</span>
                      </div>
                      {paymentPeriod === "yearly" && (
                        <div className="text-sm text-muted-foreground">or ฿{coverage.monthlyPrice.toLocaleString()}/month</div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => console.log("Selected:", coverage.type)}
                      variant={coverage.recommended ? "default" : "outline"}
                      className="w-full"
                      data-testid={`button-select-${coverage.type}`}
                    >
                      {t('selectPlan')}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <ComparisonTable />

          {/* Important Note */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <i className="fas fa-info-circle text-amber-600 text-xl mt-0.5"></i>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Important Note</h4>
                <p className="text-sm text-amber-800">
                  Prices shown are estimates. Actual prices may vary based on additional conditions.
                  Please contact our team for an accurate quote.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1"
              data-testid="button-download-pdf"
            >
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </Button>
            <Button
              className="flex-1"
              data-testid="button-contact-agent"
            >
              <i className="fas fa-phone-alt mr-2"></i>
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
