interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted -translate-y-1/2 z-0 rounded-full"></div>
      <div
        className="absolute top-1/2 left-0 h-2 bg-accent -translate-y-1/2 z-10 transition-all duration-300 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>

      <div className="relative flex justify-between z-20">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                currentStep >= step
                  ? 'bg-accent text-white scale-110 shadow-md'
                  : 'bg-white border-2 border-border text-muted-foreground'
              }`}
              data-testid={`step-${step}`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
