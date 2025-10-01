import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/language-toggle";
import { HeroSection } from "@/components/hero-section";
import { CoverageCards } from "@/components/coverage-cards";
import { BenefitsSection } from "@/components/benefits-section";
import { QuoteWizard } from "@/components/quote-wizard";
import { QuoteResults } from "@/components/quote-results";
import type { QuoteResult } from "@/types/quote";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useTranslation();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteResult | null>(null);

  const handleQuoteGenerated = (quote: QuoteResult) => {
    setCurrentQuote(quote);
    setResultsOpen(true);
  };

  const handleSelectCoverage = (type: string) => {
    setWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-primary text-2xl sm:text-3xl"></i>
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {t('appName')}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>{t('contact')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection onGetQuote={() => setWizardOpen(true)} />
        <CoverageCards onSelectCoverage={handleSelectCoverage} />
        <BenefitsSection />
        
        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free insurance quote in just 2 minutes
            </p>
            <Button
              size="lg"
              onClick={() => setWizardOpen(true)}
              className="bg-white text-primary hover:bg-white/95 shadow-lg"
              data-testid="button-get-quote-cta"
            >
              <span>{t('getQuote')}</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
                <span className="text-xl font-bold">{t('appName')}</span>
              </div>
              <p className="text-sm text-white/70">
                Leading online motor insurance platform in Thailand
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Type 1 Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Type 2 Insurance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Type 3 Insurance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-phone-alt"></i>
                  <span>02-123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <span>info@insurance.co.th</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-white/70">
            <p>&copy; 2024 Motor Insurance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuoteWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onQuoteGenerated={handleQuoteGenerated}
      />
      
      <QuoteResults
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        quote={currentQuote}
      />
    </div>
  );
}
