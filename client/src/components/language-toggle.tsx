import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "th" ? "en" : "th";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      data-testid="language-toggle"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {i18n.language === "th" ? "EN" : "TH"}
      </span>
    </Button>
  );
}
