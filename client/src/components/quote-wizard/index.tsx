import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepIndicator } from "./step-indicator";
import { VehicleInfoStep } from "./vehicle-info-step";
import { VehicleDetailsStep } from "./vehicle-details-step";
import { DriverInfoStep } from "./driver-info-step";
import { VehicleUsageStep } from "./vehicle-usage-step";
import { CoverageSelectionStep } from "./coverage-selection-step";
import { ContactInfoStep } from "./contact-info-step";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  vehicleInfoSchema,
  vehicleDetailsSchema,
  coverageSelectionSchema,
  driverInfoSchema,
  vehicleUsageSchema,
  contactInfoSchema,
  completeQuoteSchema,
} from "@shared/schema";
import type { QuoteFormData, QuoteResult } from "@/types/quote";
import { z } from "zod";

interface QuoteWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuoteGenerated: (quote: QuoteResult) => void;
}

const wizardSteps = [
  { id: 1, title: "Vehicle Brand", schema: vehicleInfoSchema },
  { id: 2, title: "Vehicle Model", schema: vehicleInfoSchema },
  { id: 3, title: "Vehicle Year", schema: vehicleInfoSchema },
  { id: 4, title: "Transmission", schema: vehicleInfoSchema },
  { id: 5, title: "License Plate", schema: vehicleDetailsSchema },
  { id: 6, title: "Chassis Number", schema: vehicleDetailsSchema },
  { id: 7, title: "Engine Number", schema: vehicleDetailsSchema },
  { id: 8, title: "Color", schema: vehicleDetailsSchema },
  { id: 9, title: "Driver Age", schema: driverInfoSchema },
  { id: 10, title: "Experience", schema: driverInfoSchema },
  { id: 11, title: "Claims History", schema: driverInfoSchema },
  { id: 12, title: "NCB Status", schema: driverInfoSchema },
  { id: 13, title: "Vehicle Usage", schema: vehicleUsageSchema },
  { id: 14, title: "Annual Mileage", schema: vehicleUsageSchema },
  { id: 15, title: "Parking Location", schema: vehicleUsageSchema },
  { id: 16, title: "Modifications", schema: vehicleUsageSchema },
  { id: 17, title: "Coverage Type", schema: coverageSelectionSchema },
  { id: 18, title: "Deductible", schema: coverageSelectionSchema },
  { id: 19, title: "Additional Coverage", schema: coverageSelectionSchema },
  { id: 20, title: "Contact Info", schema: contactInfoSchema },
];

// Simplified grouped steps for UI
const stepGroups = [
  {
    steps: [1, 2, 3, 4],
    component: VehicleInfoStep,
    title: "Vehicle Information",
  },
  {
    steps: [5, 6, 7, 8],
    component: VehicleDetailsStep,
    title: "Vehicle Details",
  },
  {
    steps: [9, 10, 11, 12],
    component: DriverInfoStep,
    title: "Driver Information",
  },
  {
    steps: [13, 14, 15, 16],
    component: VehicleUsageStep,
    title: "Vehicle Usage",
  },
  {
    steps: [17, 18, 19],
    component: CoverageSelectionStep,
    title: "Coverage Selection",
  },
  { steps: [20], component: ContactInfoStep, title: "Contact Information" },
];

export function QuoteWizard({
  open,
  onOpenChange,
  onQuoteGenerated,
}: QuoteWizardProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [currentStepGroup, setCurrentStepGroup] = useState(0);

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
      onQuoteGenerated(data);
      onOpenChange(false);
      form.reset();
      setCurrentStepGroup(0);
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

  const CurrentStepComponent = stepGroups[currentStepGroup].component;
  const totalSteps = 16;
  const currentStep = stepGroups[currentStepGroup].steps[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 border-b border-blue-700 z-10 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-2xl sm:text-3xl font-bold text-white">
              {t("wizardTitle")}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Complete the quote wizard to get your personalized insurance quote
            </DialogDescription>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/20"
              data-testid="button-close-wizard"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <FormProvider {...form}>
          <Form {...form}>
            <div className="px-6 sm:px-8 py-8 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
              <CurrentStepComponent />
            </div>

            <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-border px-6 sm:px-8 py-6">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepGroup === 0}
                  className="border-2 border-gray-300 hover:bg-gray-100"
                  data-testid="button-previous"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  {t("previous")}
                </Button>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted">
                    {t("step")} {currentStep} / {totalSteps}
                  </span>

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={submitQuoteMutation.isPending}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold"
                    data-testid="button-next-submit"
                  >
                    {currentStepGroup === stepGroups.length - 1 ? (
                      <>
                        {submitQuoteMutation.isPending ? (
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                        ) : (
                          <i className="fas fa-paper-plane mr-2"></i>
                        )}
                        {t("submit")}
                      </>
                    ) : (
                      <>
                        {t("next")}
                        <i className="fas fa-arrow-right ml-2"></i>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
