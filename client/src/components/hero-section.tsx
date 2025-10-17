import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetQuote: () => void;
}

export function HeroSection({ onGetQuote }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-semibold leading-tight text-primary mb-6 whitespace-pre-line">
            {t('heroTitle')}
          </h1>

          <p className="text-2xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('heroSubtitle')}
          </p>

          <Button
            size="lg"
            onClick={onGetQuote}
            data-testid="button-get-quote-hero"
          >
            <span>{t('getQuote')}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
