import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { LanguageToggle } from "@/components/language-toggle";
import { HeroSection } from "@/components/hero-section";
import { CoverageCards } from "@/components/coverage-cards";
import { BenefitsSection } from "@/components/benefits-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const handleGetQuote = () => {
    navigate("/wizard");
  };

  const handleSelectCoverage = (type: string) => {
    navigate("/wizard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-yellow-400 text-2xl sm:text-3xl"></i>
              <span className="text-xl sm:text-2xl font-bold text-white">
                {t('appName')}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button variant="ghost" size="sm" className="hidden sm:flex text-white hover:bg-white/20">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>{t('contact')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection onGetQuote={handleGetQuote} />
        <CoverageCards onSelectCoverage={handleSelectCoverage} />
        <BenefitsSection />
        
        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free insurance quote in just 2 minutes
            </p>
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="bg-white text-purple-600 hover:bg-yellow-400 hover:text-purple-700 shadow-lg font-bold"
              data-testid="button-get-quote-cta"
            >
              <span>{t('getQuote')}</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white py-12">
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

    </div>
  );
}
