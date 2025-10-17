import { useParams, useLocation } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function QuoteReview() {
  const { id } = useParams();
  const [, navigate] = useLocation();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showCta={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Quote Generated Successfully!
            </h1>
            <p className="text-muted-foreground">
              Your insurance quote is ready for review
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Quote ID</p>
            <p className="text-lg font-mono font-semibold text-primary">{id}</p>
          </div>

          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Quote review page - Coming soon
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handleBackToHome}
              className="flex-1"
            >
              Back to Home
            </Button>
            <Button className="flex-1">
              Download Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
