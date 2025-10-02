import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "./quote-card";
import { ComparisonTable } from "./comparison-table";
import type { QuoteResult } from "@/types/quote";

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
      type: "type1" as const,
      title: "Type 1",
      subtitle: "Comprehensive",
      price: quote.type1Price,
      monthlyPrice: Math.round(quote.type1Price / 11),
      recommended: true,
      features: [
        { text: `Own damage up to ฿${(quote.type1Price * 40).toLocaleString()}`, available: true },
        { text: "Third-party liability ฿1,000,000", available: true },
        { text: "Fire & theft protection", available: true },
        { text: "Flood coverage included", available: true },
        { text: "Driver PA ฿100,000", available: true },
        { text: "24/7 Roadside assistance", available: true },
      ],
    },
    {
      type: "type2" as const,
      title: "Type 2",
      subtitle: "Fire & Theft",
      price: quote.type2Price,
      monthlyPrice: Math.round(quote.type2Price / 11),
      recommended: false,
      features: [
        { text: `Fire & theft up to ฿${(quote.type2Price * 30).toLocaleString()}`, available: true },
        { text: "Third-party liability ฿1,000,000", available: true },
        { text: "Flood coverage included", available: true },
        { text: "Driver PA ฿100,000", available: true },
        { text: "No own damage coverage", available: false },
      ],
    },
    {
      type: "type3" as const,
      title: "Type 3",
      subtitle: "Third Party",
      price: quote.type3Price,
      monthlyPrice: Math.round(quote.type3Price / 11),
      recommended: false,
      features: [
        { text: "Third-party liability ฿1,000,000", available: true },
        { text: "Basic legal protection", available: true },
        { text: "No fire & theft", available: false },
        { text: "No own damage coverage", available: false },
        { text: "No additional coverage", available: false },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 py-8 rounded-t-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
                {t('quoteResultsTitle')}
              </DialogTitle>
              <DialogDescription className="text-white/90">
                {t('quoteResultsSubtitle')}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/10"
              data-testid="button-close-results"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-white/30">
              <div className="text-xs text-purple-600 mb-1 font-semibold">Vehicle</div>
              <div className="font-bold text-gray-800">{quote.carBrand} {quote.carModel} {quote.carYear}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-white/30">
              <div className="text-xs text-purple-600 mb-1 font-semibold">License</div>
              <div className="font-bold text-gray-800">{quote.licensePlate}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-white/30">
              <div className="text-xs text-purple-600 mb-1 font-semibold">Customer</div>
              <div className="font-bold text-gray-800">{quote.firstName} {quote.lastName}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-white/30">
              <div className="text-xs text-purple-600 mb-1 font-semibold">Date</div>
              <div className="font-bold text-gray-800">{new Date(quote.createdAt).toLocaleDateString('th-TH')}</div>
            </div>
          </div>
        </div>
        
        <div className="px-6 sm:px-8 py-6 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-sm text-gray-700 font-semibold">Payment:</span>
            <div className="inline-flex rounded-lg border-2 border-purple-300 p-1 bg-white shadow-sm">
              <Button
                variant={paymentPeriod === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPaymentPeriod("yearly")}
                className={paymentPeriod === "yearly" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "hover:bg-purple-50"}
                data-testid="button-payment-yearly"
              >
                {t('yearly')}
              </Button>
              <Button
                variant={paymentPeriod === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPaymentPeriod("monthly")}
                className={paymentPeriod === "monthly" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "hover:bg-purple-50"}
                data-testid="button-payment-monthly"
              >
                {t('monthly')}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="px-6 sm:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {quotes.map((quoteItem) => (
              <QuoteCard
                key={quoteItem.type}
                {...quoteItem}
                paymentPeriod={paymentPeriod}
                onSelect={() => {
                  // Handle plan selection
                  console.log("Selected:", quoteItem.type);
                }}
              />
            ))}
          </div>
          
          <ComparisonTable />
          
          <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-5 shadow-md">
            <div className="flex items-start space-x-3">
              <i className="fas fa-info-circle text-orange-600 text-2xl mt-0.5"></i>
              <div>
                <h4 className="font-bold text-orange-900 mb-2">Important Note</h4>
                <p className="text-sm text-orange-800">
                  Prices shown are estimates. Actual prices may vary based on additional conditions. 
                  Please contact our team for an accurate quote.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1 border-2 border-purple-500 text-purple-700 hover:bg-purple-50 font-bold" data-testid="button-download-pdf">
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md" data-testid="button-contact-agent">
              <i className="fas fa-phone-alt mr-2"></i>
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
