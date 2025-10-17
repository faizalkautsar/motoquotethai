import { useState } from "react";
import { useLocation } from "wouter";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepIndicator } from "@/components/quote-wizard/step-indicator";
import { VehicleInfoStep } from "@/components/quote-wizard/vehicle-info-step";
import { DriverInfoStep } from "@/components/quote-wizard/driver-info-step";
import { VehicleUsageStep } from "@/components/quote-wizard/vehicle-usage-step";
import { CoverageSelectionStep } from "@/components/quote-wizard/coverage-selection-step";
import { ContactInfoStep } from "@/components/quote-wizard/contact-info-step";
import { QuoteResults } from "@/components/quote-results";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { completeQuoteSchema } from "@shared/schema";
import { z } from "zod";
import type { QuoteFormData } from "@/types/quote";
import type { QuoteResult } from "@/types/quote";
import { LanguageToggle } from "@/components/language-toggle";

const stepGroups = [
  { title: "Vehicle Information", steps: ["vehicleInfo"] },
  { title: "Driver Information", steps: ["driverInfo"] },
  { title: "Vehicle Usage", steps: ["vehicleUsage"] },
  { title: "Coverage Selection", steps: ["coverageSelection"] },
  { title: "Contact Information", steps: ["contactInfo"] },
];

export default function WizardPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [currentStepGroup, setCurrentStepGroup] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteResult | null>(null);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(
      currentStepGroup === stepGroups.length - 1
        ? completeQuoteSchema
        : z.any(),
    ),
    defaultValues: {
      carBrand: "",
      carModel: "",
      carYear: 2024,
      transmission: "",
      licensePlate: "",
      chassisNumber: "",
      engineNumber: "",
      color: "",
      driverAge: "",
      drivingExperience: "",
      claimsHistory: "",
      hasNCB: "",
      vehicleUsage: "",
      annualMileage: "",
      parkingLocation: "",
      hasModifications: "",
      coverageType: "type1",
      deductible: 5000,
      additionalCoverage: [],
      title: "",
      gender: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      idCard: "",
      phone: "",
      email: "",
      address: "",
      province: "",
      postalCode: "",
      occupation: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const response = await apiRequest("POST", "/api/quotes", data);
      return response.json();
    },
    onSuccess: (data: QuoteResult) => {
      toast({
        title: "Quote Generated Successfully!",
        description: "Your personalized insurance quotes are ready.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      setCurrentQuote(data);
      setResultsOpen(true);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to generate quote. Please try again.",
      });
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      if (currentStepGroup < stepGroups.length - 1) {
        setCurrentStepGroup(currentStepGroup + 1);
      } else {
        const formData = form.getValues();
        console.log("Submitting form data:", formData);
        submitQuoteMutation.mutate(formData as QuoteFormData);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStepGroup > 0) {
      setCurrentStepGroup(currentStepGroup - 1);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleResultsClose = () => {
    setResultsOpen(false);
    form.reset();
    setCurrentStepGroup(0);
    navigate("/");
  };

  const renderCurrentStep = () => {
    const currentGroup = stepGroups[currentStepGroup];
    
    switch (currentGroup.steps[0]) {
      case "vehicleInfo":
        return <VehicleInfoStep />;
      case "driverInfo":
        return <DriverInfoStep />;
      case "vehicleUsage":
        return <VehicleUsageStep />;
      case "coverageSelection":
        return <CoverageSelectionStep />;
      case "contactInfo":
        return <ContactInfoStep />;
      default:
        return null;
    }
  };

  const currentStep = currentStepGroup + 1;
  const totalSteps = stepGroups.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-blue-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-yellow-400 text-2xl sm:text-3xl"></i>
              <span className="text-xl sm:text-2xl font-bold text-white">
                {t('appName')}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
                data-testid="button-close-wizard-page"
              >
                <i className="fas fa-times text-xl"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Wizard Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="sticky top-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 border-b border-blue-700 z-10 px-6 sm:px-8 py-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {t('wizardTitle')}
              </h1>
              <p className="text-white/90 mt-2 sr-only">
                Complete the quote wizard to get your personalized insurance quote
              </p>
            </div>
            
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          <FormProvider {...form}>
            <Form {...form}>
              <div className="p-6 sm:p-8">
                {renderCurrentStep()}
              </div>
              
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between border-t border-border pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepGroup === 0}
                  className="border-2 border-purple-500 text-purple-700 hover:bg-purple-50 disabled:opacity-50"
                  data-testid="button-previous"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  {t('previous')}
                </Button>
                
                <div className="text-sm text-muted font-medium">
                  Step {currentStep} of {totalSteps}
                </div>
                
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={submitQuoteMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md"
                  data-testid="button-next"
                >
                  {submitQuoteMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {t('processing')}
                    </>
                  ) : currentStepGroup === stepGroups.length - 1 ? (
                    <>
                      {t('submit')}
                      <i className="fas fa-check ml-2"></i>
                    </>
                  ) : (
                    <>
                      {t('next')}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>

      {/* Results Modal */}
      <QuoteResults
        open={resultsOpen}
        onOpenChange={handleResultsClose}
        quote={currentQuote}
      />
    </div>
  );
}
