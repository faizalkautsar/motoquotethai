import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
      className="flex items-center space-x-2"
      data-testid="language-toggle"
    >
      <i className="fas fa-globe text-muted-foreground"></i>
      <span className="font-medium">
        {i18n.language === "th" ? "EN" : "TH"}
      </span>
    </Button>
  );
}
