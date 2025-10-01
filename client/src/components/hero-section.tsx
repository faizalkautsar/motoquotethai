import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetQuote: () => void;
}

export function HeroSection({ onGetQuote }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <i className="fas fa-star text-yellow-300"></i>
              <span className="text-sm font-medium">
                {t('appName')} - Trusted by 50,000+ customers
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
              {t('heroTitle')}
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-xl">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={onGetQuote}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl group font-bold"
                data-testid="button-get-quote-hero"
              >
                <span>{t('getQuote')}</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                data-testid="button-how-it-works"
              >
                <i className="fas fa-play-circle mr-2"></i>
                <span>{t('howItWorks')}</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span className="text-sm">No fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span className="text-sm">2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span className="text-sm">No signup</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <i className="fas fa-car text-2xl text-white"></i>
                  </div>
                  <div>
                    <div className="h-4 bg-white/30 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-white/20 rounded w-24"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="h-3 bg-white/30 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-white/40 rounded w-24"></div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="h-3 bg-white/30 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-white/40 rounded w-24"></div>
                  </div>
                </div>
                
                <div className="bg-secondary/20 rounded-lg p-4 border border-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-white/30 rounded w-32"></div>
                    <i className="fas fa-shield-check text-secondary text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
