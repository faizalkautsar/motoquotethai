interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const milestones = [1, 4, 8, 12, 16];

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30 -translate-y-1/2 z-0 rounded-full"></div>
      <div
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 -translate-y-1/2 z-10 transition-all duration-300 rounded-full shadow-lg"
        style={{ width: `${progress}%` }}
      ></div>
      
      <div className="relative flex justify-between z-20">
        {milestones.map((milestone) => (
          <div key={milestone} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all shadow-lg ${
                currentStep >= milestone
                  ? 'bg-white text-blue-600 scale-110'
                  : 'bg-white/40 text-white'
              }`}
              data-testid={`step-milestone-${milestone}`}
            >
              {milestone}
            </div>
            <span className="text-xs font-medium text-white hidden sm:block">
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
