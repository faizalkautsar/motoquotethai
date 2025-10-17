import { useState } from "react";
import { useLocation } from "wouter";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Header } from "@/components/header";
import { StepIndicator } from "@/components/quote-wizard/step-indicator";
import { VehicleInfoStep } from "@/components/quote-wizard/vehicle-info-step";
import { VehicleDetailsStep } from "@/components/quote-wizard/vehicle-details-step";
import { DriverInfoStep } from "@/components/quote-wizard/driver-info-step";
import { VehicleUsageStep } from "@/components/quote-wizard/vehicle-usage-step";
import { CoverageSelectionStep } from "@/components/quote-wizard/coverage-selection-step";
import { ContactInfoStep } from "@/components/quote-wizard/contact-info-step";
import { QuoteResults } from "@/components/quote-results";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { completeQuoteSchema } from "@shared/schema";
import type { QuoteFormData } from "@/types/quote";
import type { QuoteResult } from "@/types/quote";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

const stepGroups = [
  {
    title: "Vehicle Information",
    steps: ["vehicleInfo"],
    fields: ["carBrand", "carModel", "carYear", "transmission"] as const
  },
  {
    title: "Vehicle Details",
    steps: ["vehicleDetails"],
    fields: ["licensePlate", "chassisNumber", "engineNumber", "color"] as const
  },
  {
    title: "Driver Information",
    steps: ["driverInfo"],
    fields: ["driverAge", "drivingExperience", "claimsHistory", "hasNCB"] as const
  },
  {
    title: "Vehicle Usage",
    steps: ["vehicleUsage"],
    fields: ["vehicleUsage", "annualMileage", "parkingLocation", "hasModifications"] as const
  },
  {
    title: "Coverage Selection",
    steps: ["coverageSelection"],
    fields: ["coverageType", "deductible", "additionalCoverage"] as const
  },
  {
    title: "Contact Information",
    steps: ["contactInfo"],
    fields: ["title", "gender", "firstName", "lastName", "birthDate", "idCard", "phone", "email", "address", "province", "postalCode", "occupation"] as const
  },
];

export default function WizardPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [currentStepGroup, setCurrentStepGroup] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteResult | null>(null);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(completeQuoteSchema),
    mode: "onChange",
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
    // Get fields for current step
    const currentFields = stepGroups[currentStepGroup].fields;

    // Trigger validation for current step fields
    const isValid = await form.trigger(currentFields as any);

    if (isValid) {
      if (currentStepGroup < stepGroups.length - 1) {
        setCurrentStepGroup(currentStepGroup + 1);
      } else {
        // On final step, validate all fields before submitting
        const allValid = await form.trigger();
        if (allValid) {
          const formData = form.getValues();
          console.log("Submitting form data:", formData);
          submitQuoteMutation.mutate(formData as QuoteFormData);
        }
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
      case "vehicleDetails":
        return <VehicleDetailsStep />;
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
    <div className="min-h-screen bg-background">
      <Header onClose={handleClose} showClose={true} showCta={false} />

      {/* Wizard Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="sticky bg-white border-b border-border z-10 px-6 sm:px-8 py-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {t('wizardTitle')}
              </h1>
              <p className="text-muted-foreground mt-2">
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
                  data-testid="button-previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('previous')}
                </Button>

                <div className="text-sm text-muted-foreground font-medium">
                  Step {currentStep} of {totalSteps}
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={submitQuoteMutation.isPending}
                  data-testid="button-next"
                >
                  {submitQuoteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('processing')}
                    </>
                  ) : currentStepGroup === stepGroups.length - 1 ? (
                    <>
                      {t('submit')}
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      {t('next')}
                      <ArrowRight className="w-4 h-4" />
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
