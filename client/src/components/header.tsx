import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface HeaderProps {
  onCtaClick?: () => void;
  showCta?: boolean;
  onClose?: () => void;
  showClose?: boolean;
}

export function Header({ onCtaClick, showCta = true, onClose, showClose = false }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {t('appName')}
            </span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="4" r="4" className="fill-accent" />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            {showCta && onCtaClick && (
              <Button variant="default" size="default" onClick={onCtaClick} className="hidden sm:flex">
                {t('getQuote')}
              </Button>
            )}
            {showClose && onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-muted"
                data-testid="button-close"
              >
                <span className="text-xl">×</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
