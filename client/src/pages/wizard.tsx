import { useState, useEffect } from "react";
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

const testValue = {
    carBrand: 'mitsubishi',
    carModel: 'attrage',
    carYear: 2024,
    transmission: 'manual',
    licensePlate: 'Distinctio Voluptat',
    chassisNumber: '853',
    engineNumber: '513',
    color: 'other',
    driverAge: '26-35',
    drivingExperience: '3-5',
    claimsHistory: '1',
    hasNCB: 'yes',
    vehicleUsage: 'personal',
    annualMileage: '10000-20000',
    parkingLocation: 'street',
    hasModifications: 'no',
    coverageType: 'comprehensive',
    deductible: 5000,
    additionalCoverage: ['flood', 'fire', 'theft', 'driver-pa', 'passenger', 'windshield'],
    title: 'Mr',
    gender: 'Male',
    firstName: 'Petra',
    lastName: 'Jerome',
    birthDate: '2002-02-28',
    idCard: '09879898798798',
    phone: '98798798987',
    email: 'zataji@mailinator.com',
    address: 'Do ut tempor dolorum',
    province: 'chiangmai',
    postalCode: '31232',
    occupation: 'employee',
    agreeTerms: true,
};

const testResponse = {
    self: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/aadaa925-bdfb-4314-88bb-6cf55b1d56b2/',
        id: 'aadaa925-bdfb-4314-88bb-6cf55b1d56b2',
    },
    number: 'QT-20251017-0016761',
    transactionType: 'New Business',
    status: 'Quoted',
    paymentScheme: 'Yearly',
    policyTerm: 'Yearly',
    recurrenceScheme: 'Yearly',
    progress: 80,
    leadType: 'Drop Off',
    leadClassification: 'Hot',
    startDate: '2025-12-20',
    endDate: '2026-12-20',
    netAmount: '15000.00',
    loadingAmount: '1660.00',
    netLoadAmount: '16660.00',
    grossAmount: '16660.00',
    iptAmount: '0.00',
    finalAmount: '16660.00',
    totalPayableAmount: '16900.00',
    proratedAmount: '16900.00',
    adminFee: '240.00',
    commissionAmount: null,
    recurringPayableAmount: null,
    pricingBreakdown: {
        premiums: {
            yearly: {
                totalPayableAmount: 16900,
            },
            monthly: {
                totalPayableAmount: 1408.3333333333333,
            },
        },
    },
    pricingDeviation: {
        iptAmount: 0.0,
        netAmount: 15000.0,
        finalAmount: 16660.0,
        loadingAmount: 1660.0,
        premiumAmount: 16660.0,
        netLoadAmount: 16660.0,
        proratedAmount: 16900.0,
        pricingBreakdown: {
            premiums: {
                yearly: {
                    totalPayableAmount: 16900,
                },
                monthly: {
                    totalPayableAmount: 1408.3333333333333,
                },
            },
        },
        totalPayableAmount: 16900.0,
    },
    product: {
        href: 'https://sandbox-bo.i2go.io/api/v3/product-service/products/79fc572a-152b-4f02-91b3-ae4742ef37a7/',
        id: '79fc572a-152b-4f02-91b3-ae4742ef37a7',
    },
    productPlan: {
        href: 'https://sandbox-bo.i2go.io/api/v3/product-service/plans/2cf2be54-d14e-44d9-8542-27b1f2658dd3/',
        id: '2cf2be54-d14e-44d9-8542-27b1f2658dd3',
    },
    agent: {
        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/f31404d9-799d-40fe-abb5-936986fcad81/',
        id: 'f31404d9-799d-40fe-abb5-936986fcad81',
    },
    policyVersion: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/e4f4ebd0-be52-42ca-b725-69459ff62c78/',
        id: 'e4f4ebd0-be52-42ca-b725-69459ff62c78',
    },
    holder: {
        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/2593edd6-0465-4119-b685-3afdad63bb5c/',
        id: '2593edd6-0465-4119-b685-3afdad63bb5c',
    },
    addresses: [
        {
            href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/addresses/042e35ee-8230-4026-9923-e857a523635d/',
            id: '042e35ee-8230-4026-9923-e857a523635d',
        },
    ],
    coverages: [
        {
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policy-coverages/c348bfe9-3d32-4367-abda-386398b2e283/',
            id: 'c348bfe9-3d32-4367-abda-386398b2e283',
        },
    ],
    insuredItems: [
        {
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/items/090719ea-4d39-4bf1-83ec-f4a3f31c0912/',
            id: '090719ea-4d39-4bf1-83ec-f4a3f31c0912',
        },
    ],
    additionalPartners: [],
    createdAt: '2025-10-17T15:12:16.114177+02:00',
    updatedAt: '2025-10-17T15:12:17.250696+02:00',
};

export default function WizardPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [currentStepGroup, setCurrentStepGroup] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteResult | null>(null);

  useEffect(() => {
    document.title = "Get Your Quote - MotoQuoteThai";
  }, []);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(completeQuoteSchema),
    mode: "onChange",
    defaultValues: testValue as any,
    // defaultValues: {
    //   carBrand: "",
    //   carModel: "",
    //   carYear: 2024,
    //   transmission: "",
    //   licensePlate: "",
    //   chassisNumber: "",
    //   engineNumber: "",
    //   color: "",
    //   driverAge: "",
    //   drivingExperience: "",
    //   claimsHistory: "",
    //   hasNCB: "",
    //   vehicleUsage: "",
    //   annualMileage: "",
    //   parkingLocation: "",
    //   hasModifications: "",
    //   coverageType: "comprehensive",
    //   deductible: 5000,
    //   additionalCoverage: [],
    //   title: "",
    //   gender: "",
    //   firstName: "",
    //   lastName: "",
    //   birthDate: "",
    //   idCard: "",
    //   phone: "",
    //   email: "",
    //   address: "",
    //   province: "",
    //   postalCode: "",
    //   occupation: "",
    // },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {

      const {
        carBrand,
        carModel,
        carYear,
        transmission,
        licensePlate,
        chassisNumber,
        engineNumber,
        color,
        driverAge,
        drivingExperience,
        claimsHistory,
        hasNCB,
        vehicleUsage,
        annualMileage,
        parkingLocation,
        hasModifications,
        coverageType,
        deductible,
        additionalCoverage,
        title,
        gender,
        firstName,
        lastName,
        birthDate,
        idCard,
        phone,
        email,
        address,
        province,
        postalCode,
        occupation,
      } = data;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      const raw = {
          product: 'motor-vehicle',
          plan: coverageType,
          effectiveDate: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
          policy_attributes: [
              {
                  key: 'deductible_amount',
                  key_display: 'Deductible Amount',
                  value: deductible,
                  value_display: `฿${deductible.toLocaleString()}`,
              },
              (additionalCoverage?.includes('flood') && {
                  key: 'flood_coverage',
                  key_display: 'Flood Coverage',
                  value: 800,
                  value_display: '+฿800/year',
              }),
              (additionalCoverage?.includes('fire') && {
                  key: 'fire_protection',
                  key_display: 'Fire Protection',
                  value: 600,
                  value_display: '+฿600/year',
              }),
              (additionalCoverage?.includes('theft') && {
                  key: 'theft_coverage',
                  key_display: 'Theft Coverage',
                  value: 1200,
                  value_display: '+฿1,200/year',
              }),
              (additionalCoverage?.includes('driver-pa') && {
                  key: 'personal_accident_driver',
                  key_display: 'Personal Accident for Driver',
                  value: 500,
                  value_display: '+฿500/year',
              }),
              (additionalCoverage?.includes('passenger') && {
                  key: 'passenger_protection',
                  key_display: 'Passenger Protection',
                  value: 600,
                  value_display: '+฿600/year',
              }),
              (additionalCoverage?.includes('windshield') && {
                  key: 'windshield_protection',
                  key_display: 'Windshield Protection',
                  value: 400,
                  value_display: '+฿400/year',
              }),
          ],
          policy_headers: [
              {
                  key: 'source',
                  value: 'CCI',
                  key_display: 'Source',
                  value_display: 'CCI',
              },
          ],
          progress: 80,
          policy_term: 'Yearly',
          policyHolder: {
              category: 'Person',
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneMobile: phone,
              title: title,
              dob: birthDate,
              gender: gender,
              idNumber: idCard,
              extraData: [
                  {
                      key: 'occupation',
                      key_display: 'Occupation',
                      value: occupation,
                      value_display: occupation,
                  },
                  {
                      key: 'driver_age_range',
                      key_display: 'Driver Age Range',
                      value: driverAge,
                      value_display: driverAge,
                  },
                  {
                      key: 'driving_experience',
                      key_display: 'Driving Experience',
                      value: drivingExperience,
                      value_display: drivingExperience,
                  },
                  {
                      key: 'claims_history_past_3_years',
                      key_display: 'Claims History (Past 3 years)',
                      value: claimsHistory,
                      value_display: claimsHistory,
                  },
                  {
                      key: 'no_claims_bonus_ncb',
                      key_display: 'No Claims Bonus (NCB)',
                      value: hasNCB,
                      value_display: hasNCB,
                  },
              ],
              addresses: [
                  {
                      addressType: 'DEFAULT',
                      line1: address,
                      city: province,
                      state: province,
                      postalCode: postalCode,
                      country: 'TH',
                  },
              ],
          },
          additionalPartners: [],
          insuredItems: [
              {
                  name: `${carYear} ${carBrand} ${carModel}`,
                  slug: `${carYear}_${carBrand}_${carModel}`,
                  attributes: [
                      {
                          key: 'car_brand',
                          key_display: 'Car Brand',
                          value: carBrand,
                          value_display: carBrand,
                      },
                      {
                          key: 'car_model',
                          key_display: 'Car Model',
                          value: carModel,
                          value_display: carModel,
                      },
                      {
                          key: 'year',
                          key_display: 'Year',
                          value: carYear,
                          value_display: carYear.toString(),
                      },
                      {
                          key: 'transmission',
                          key_display: 'Transmission',
                          value: transmission,
                          value_display: transmission,
                      },
                      {
                          key: 'license_plate',
                          key_display: 'License Plate',
                          value: licensePlate,
                          value_display: licensePlate,
                      },
                      {
                          key: 'chassis_number',
                          key_display: 'Chassis Number',
                          value: chassisNumber,
                          value_display: chassisNumber,
                      },
                      {
                          key: 'engine_number',
                          key_display: 'Engine Number',
                          value: engineNumber,
                          value_display: engineNumber,
                      },
                      {
                          key: 'color',
                          key_display: 'Color',
                          value: color,
                          value_display: color,
                      },
                      {
                          key: 'usage_type',
                          key_display: 'Usage Type',
                          value: vehicleUsage,
                          value_display: vehicleUsage,
                      },
                      {
                          key: 'annual_mileage',
                          key_display: 'Annual Mileage',
                          value: annualMileage,
                          value_display: `${annualMileage.toLocaleString()} km`,
                      },
                      {
                          key: 'parking_location',
                          key_display: 'Parking Location',
                          value: parkingLocation,
                          value_display: parkingLocation,
                      },
                      {
                          key: 'vehicle_modifications',
                          key_display: 'Vehicle Modifications',
                          value: hasModifications,
                          value_display: hasModifications,
                      },
                  ],
                  value: 0,
              },
          ],
          coverages: [
              {
                  coverageType: 'comprehensive',
                  premium: 100,
                  deductible: 0,
              },
          ],
          skipRating: false,
          checkBusinessRules: false,
          saveToDB: true,
          activatePolicy: false,
      };

      debugger;
      const response = await apiRequest('POST', 'https://sandbox-bo.i2go.io/api/v3/embedded-service/quotes/', raw)
          .then((response) => response.json())
          .catch((error) => {
              console.error(error);
              // throw new Error(error);
              return testResponse;
          });


      return response;



      // const response = await apiRequest("POST", "/api/quotes", data);
      // return response.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Quote Generated Successfully!",
        description: "Your personalized insurance quotes are ready.",
      });
      queryClient.invalidateQueries({ queryKey: ["https://sandbox-bo.i2go.io/api/v3/embedded-service/quotes/"] });
      console.log("Quote response:", data);

      // Redirect to quote review page
      if (data?.self?.id) {
        navigate(`/your-quote/${data.self.id}`);
      }
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
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
