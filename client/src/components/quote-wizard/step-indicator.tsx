interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const milestones = [1, 4, 8, 12, 16];

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0"></div>
      <div
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-10 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      
      <div className="relative flex justify-between z-20">
        {milestones.map((milestone) => (
          <div key={milestone} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${
                currentStep >= milestone
                  ? 'bg-primary text-white'
                  : 'bg-border text-muted'
              }`}
              data-testid={`step-milestone-${milestone}`}
            >
              {milestone}
            </div>
            <span className="text-xs text-muted hidden sm:block">
              {milestone === 1 && 'Vehicle'}
              {milestone === 4 && 'Details'}
              {milestone === 8 && 'Coverage'}
              {milestone === 12 && 'Driver'}
              {milestone === 16 && 'Contact'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
