import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface QuoteCardProps {
  type: "type1" | "type2" | "type3";
  title: string;
  subtitle: string;
  price: number;
  monthlyPrice: number;
  features: { text: string; available: boolean }[];
  recommended?: boolean;
  paymentPeriod: "yearly" | "monthly";
  onSelect: () => void;
}

export function QuoteCard({
  type,
  title,
  subtitle,
  price,
  monthlyPrice,
  features,
  recommended = false,
  paymentPeriod,
  onSelect,
}: QuoteCardProps) {
  const displayPrice = paymentPeriod === "yearly" ? price : monthlyPrice;
  const period = paymentPeriod === "yearly" ? "/year" : "/month";

  return (
    <Card className={`${recommended ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' : 'border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white'} shadow-md hover:shadow-xl transition-all hover:-translate-y-1`} data-testid={`card-${type}`}>
      <CardHeader className={recommended ? 'bg-gradient-to-r from-blue-100 to-purple-100' : 'bg-gray-50'}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted">{subtitle}</p>
          </div>
          {recommended && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
              Recommended
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-end mb-1">
            <span className={`text-4xl font-bold ${recommended ? 'text-blue-600' : 'text-purple-600'}`} data-testid={`price-${type}`}>
              ฿{displayPrice.toLocaleString()}
            </span>
            <span className="text-muted ml-2 mb-1">{period}</span>
          </div>
          {paymentPeriod === "yearly" && (
            <div className="text-sm text-muted">or ฿{monthlyPrice.toLocaleString()}/month</div>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-sm">
              <i className={`fas ${feature.available ? 'fa-check-circle text-secondary' : 'fa-times-circle text-muted/50'} mt-0.5`}></i>
              <span className={feature.available ? 'text-foreground' : 'text-muted'}>{feature.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={onSelect}
          className={`w-full font-bold ${recommended ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50'}`}
          data-testid={`button-select-quote-${type}`}
        >
          Select Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
