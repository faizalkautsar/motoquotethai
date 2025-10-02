import { useTranslation } from "react-i18next";

export function ComparisonTable() {
  const { t } = useTranslation();

  const comparisons = [
    { feature: "Own damage coverage", type1: "฿600,000", type2: "฿300,000", type3: "-" },
    { feature: "Third-party liability", type1: true, type2: true, type3: true },
    { feature: "Authorized repair shop", type1: true, type2: false, type3: false },
    { feature: "Deductible", type1: "฿0", type2: "฿3,000", type3: "-" },
    { feature: "Flood coverage", type1: true, type2: false, type3: false },
    { feature: "Theft protection", type1: true, type2: false, type3: false },
  ];

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-purple-300 shadow-lg" data-testid="coverage-comparison-table">
      <h3 className="text-2xl font-bold text-purple-900 mb-6">
        {t('compareTitle')}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Feature</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Type 1</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Type 2</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Type 3</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, idx) => (
              <tr key={idx} className="border-b border-border/50">
                <td className="py-3 px-4 text-foreground">{item.feature}</td>
                <td className="text-center py-3 px-4">
                  {typeof item.type1 === 'boolean' ? (
                    <i className={`fas ${item.type1 ? 'fa-check-circle text-secondary' : 'fa-times-circle text-muted/50'}`}></i>
                  ) : (
                    <span className="text-secondary font-medium">{item.type1}</span>
                  )}
                </td>
                <td className="text-center py-3 px-4">
                  {typeof item.type2 === 'boolean' ? (
                    <i className={`fas ${item.type2 ? 'fa-check-circle text-secondary' : 'fa-times-circle text-muted/50'}`}></i>
                  ) : (
                    <span className={item.type2 !== '-' ? 'text-secondary font-medium' : 'text-muted'}>{item.type2}</span>
                  )}
                </td>
                <td className="text-center py-3 px-4">
                  {typeof item.type3 === 'boolean' ? (
                    <i className={`fas ${item.type3 ? 'fa-check-circle text-secondary' : 'fa-times-circle text-muted/50'}`}></i>
                  ) : (
                    <span className="text-muted">{item.type3}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
