import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const testResponse = {
    self: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/aadaa925-bdfb-4314-88bb-6cf55b1d56b2/',
        id: 'aadaa925-bdfb-4314-88bb-6cf55b1d56b2',
    },
    number: 'QT-20251017-0016761',
    agent: {
        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/f31404d9-799d-40fe-abb5-936986fcad81/',
        id: 'f31404d9-799d-40fe-abb5-936986fcad81',
    },
    holder: {
        href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/2593edd6-0465-4119-b685-3afdad63bb5c/',
        id: '2593edd6-0465-4119-b685-3afdad63bb5c',
    },
    product: {
        href: 'https://sandbox-bo.i2go.io/api/v3/product-service/products/79fc572a-152b-4f02-91b3-ae4742ef37a7/',
        id: '79fc572a-152b-4f02-91b3-ae4742ef37a7',
    },
    productPlan: {
        href: 'https://sandbox-bo.i2go.io/api/v3/product-service/plans/2cf2be54-d14e-44d9-8542-27b1f2658dd3/',
        id: '2cf2be54-d14e-44d9-8542-27b1f2658dd3',
    },
    status: 'Quoted',
    lineOfBusiness: 'Motor Vehicle',
    submissionType: '',
    underwriter: '',
    agentCompany: 'tigerlab',
    receivedDate: null,
    approvedForRenewal: false,
    paymentScheme: 'Yearly',
    paymentDay: null,
    classification: null,
    startDate: '2025-12-20',
    endDate: '2026-12-20',
    startDateOverride: null,
    endDateOverride: null,
    followUpDate: null,
    progress: 80,
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
    voucherAttributes: null,
    campaignAttributes: null,
    businessPartnerRelations: [],
    policyTerm: 'Yearly',
    recurrenceScheme: 'Yearly',
    policyVersion: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/e4f4ebd0-be52-42ca-b725-69459ff62c78/',
        id: 'e4f4ebd0-be52-42ca-b725-69459ff62c78',
    },
    items: [
        {
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/items/090719ea-4d39-4bf1-83ec-f4a3f31c0912/',
            id: '090719ea-4d39-4bf1-83ec-f4a3f31c0912',
        },
    ],
    headers: [
        {
            key: 'source',
            value: 'CCI',
            key_display: 'Source',
            value_display: 'CCI',
        },
    ],
    attributes: [
        {
            key: 'deductible_amount',
            value: 5000,
            key_display: 'Deductible Amount',
            value_display: '฿5,000',
        },
        {
            key: 'flood_coverage',
            value: 800,
            key_display: 'Flood Coverage',
            value_display: '+฿800/year',
        },
        {
            key: 'fire_protection',
            value: 600,
            key_display: 'Fire Protection',
            value_display: '+฿600/year',
        },
        {
            key: 'theft_coverage',
            value: 1200,
            key_display: 'Theft Coverage',
            value_display: '+฿1,200/year',
        },
        {
            key: 'personal_accident_driver',
            value: 500,
            key_display: 'Personal Accident for Driver',
            value_display: '+฿500/year',
        },
        {
            key: 'passenger_protection',
            value: 600,
            key_display: 'Passenger Protection',
            value_display: '+฿600/year',
        },
        {
            key: 'windshield_protection',
            value: 400,
            key_display: 'Windshield Protection',
            value_display: '+฿400/year',
        },
    ],
    declarations: {},
    lostStatusReason: null,
    otherLostStatusReasons: null,
    leadType: 'Drop Off',
    leadTypeReason: null,
    leadClassification: 'Hot',
    policy: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/56168b4f-083e-45b5-925b-8738d9a3c041/',
        id: '56168b4f-083e-45b5-925b-8738d9a3c041',
    },
    transactionType: 'New Business',
    transactions: [],
    latestVersion: null,
    currentVersion: null,
    rootVersion: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/e4f4ebd0-be52-42ca-b725-69459ff62c78/',
        id: 'e4f4ebd0-be52-42ca-b725-69459ff62c78',
    },
    rating: {
        '2-plus': {
            yearly: {
                adminFee: 60,
                iptAmount: 0,
                netAmount: 8729,
                finalAmount: 8993,
                loadingAmount: 264,
                premiumAmount: 8993,
                totalPayableAmount: 9053,
            },
            monthly: {
                adminFee: 5.0,
                iptAmount: 0.0,
                netAmount: 727.42,
                finalAmount: 749.42,
                loadingAmount: 22.0,
                premiumAmount: 749.42,
                totalPayableAmount: 754.42,
            },
            coverage: {
                deductible: 1000,
                floodCoverage: true,
                theftProtection: false,
                ownDamageCoverage: null,
                thirdPartyLiability: 490790,
                authorizedRepairShop: true,
            },
        },
        '3-plus': {
            yearly: {
                adminFee: 60,
                iptAmount: 0,
                netAmount: 3734,
                finalAmount: 4071,
                loadingAmount: 337,
                premiumAmount: 4071,
                totalPayableAmount: 4131,
            },
            monthly: {
                adminFee: 5.0,
                iptAmount: 0.0,
                netAmount: 311.17,
                finalAmount: 339.25,
                loadingAmount: 28.08,
                premiumAmount: 339.25,
                totalPayableAmount: 344.25,
            },
            coverage: {
                deductible: 3000,
                floodCoverage: true,
                theftProtection: true,
                ownDamageCoverage: null,
                thirdPartyLiability: 878407,
                authorizedRepairShop: true,
            },
        },
        comprehensive: {
            yearly: {
                adminFee: 240,
                iptAmount: 0,
                netAmount: 15000,
                finalAmount: 16660,
                loadingAmount: 1660,
                premiumAmount: 16660,
                totalPayableAmount: 16900,
            },
            monthly: {
                adminFee: 20.0,
                iptAmount: 0.0,
                netAmount: 1250.0,
                finalAmount: 1388.33,
                loadingAmount: 138.33,
                premiumAmount: 1388.33,
                totalPayableAmount: 1408.33,
            },
            coverage: {
                deductible: 0,
                floodCoverage: true,
                theftProtection: true,
                ownDamageCoverage: 600000,
                thirdPartyLiability: 1000000,
                authorizedRepairShop: true,
            },
        },
        'third-party-only': {
            yearly: {
                adminFee: 80,
                iptAmount: 0,
                netAmount: 2367,
                finalAmount: 2664,
                loadingAmount: 297,
                premiumAmount: 2664,
                totalPayableAmount: 2744,
            },
            monthly: {
                adminFee: 6.67,
                iptAmount: 0.0,
                netAmount: 197.25,
                finalAmount: 222.0,
                loadingAmount: 24.75,
                premiumAmount: 222.0,
                totalPayableAmount: 228.67,
            },
            coverage: {
                deductible: 3000,
                floodCoverage: false,
                theftProtection: true,
                ownDamageCoverage: 199656,
                thirdPartyLiability: 463129,
                authorizedRepairShop: true,
            },
        },
        'third-party-bodily-injury-and-death': {
            yearly: {
                adminFee: 100,
                iptAmount: 0,
                netAmount: 8349,
                finalAmount: 9253,
                loadingAmount: 904,
                premiumAmount: 9253,
                totalPayableAmount: 9353,
            },
            monthly: {
                adminFee: 8.33,
                iptAmount: 0.0,
                netAmount: 695.75,
                finalAmount: 771.08,
                loadingAmount: 75.33,
                premiumAmount: 771.08,
                totalPayableAmount: 779.42,
            },
            coverage: {
                deductible: 1000,
                floodCoverage: true,
                theftProtection: false,
                ownDamageCoverage: 282603,
                thirdPartyLiability: 499608,
                authorizedRepairShop: true,
            },
        },
    },
    pdfFileUrl: null,
    allowPdfGeneration: false,
    endorsementNote: null,
    fileAttachments: [],
    ratingTask: {},
    links: [
        {
            rel: 'policies',
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/policies/',
        },
        {
            rel: 'policy_versions',
            href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/versions/',
        },
        {
            rel: 'business_partners',
            href: 'https://sandbox-bo.i2go.io/api/v3/business-partner-service/business-partners/',
        },
    ],
    createdAt: '2025-10-17T15:12:16.114177+02:00',
    updatedAt: '2025-10-17T15:12:17.250696+02:00',
    contract: {
        href: 'https://sandbox-bo.i2go.io/api/v3/policy-service/contracts/c4e5d5da-601b-4ca0-85e2-bf4448fddffa/',
        id: 'c4e5d5da-601b-4ca0-85e2-bf4448fddffa',
    },
    extraData: null,
    mtaDates: [],
    excludeScheduleNewPolicyEmail: false,
    partnerVersionUuid: null,
    recurringPayableAmount: null,
};

export default function QuoteReview() {
    const { id } = useParams();
    const [, navigate] = useLocation();

    // Fetch quote details from API
    const {
        data: quoteData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [`quote-${id}`],
        queryFn: async () => {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', 'i2go b2049fae35094bf126e45ed19a106d68303cde25');
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow' as RequestRedirect,
            };

            // const response = await fetch(
            //     `https://sandbox-bo.i2go.io/api/v3/policy-service/incomplete-orders/${id}/`,
            //     requestOptions
            // );

            // if (!response.ok) {
            //     throw new Error(`Failed to fetch quote: ${response.statusText}`);
            // }

            // const data = await response.json();
            console.log('Quote data:', testResponse);
            return testResponse;
        },
        enabled: !!id, // Only run query if id exists
    });

    const handleBackToHome = () => {
        navigate('/');
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header showCta={false} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-16 h-16 text-accent animate-spin mb-4" />
                            <h2 className="text-xl font-semibold text-primary mb-2">Loading Quote Details...</h2>
                            <p className="text-muted-foreground">Please wait while we fetch your quote information</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <Header showCta={false} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Error Loading Quote</h1>
                            <p className="text-muted-foreground">
                                {error instanceof Error ? error.message : 'Failed to load quote details'}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={handleBackToHome}>Back to Home</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header showCta={false} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-2">Quote Generated Successfully!</h1>
                        <p className="text-muted-foreground">Your insurance quote is ready for review</p>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-6 mb-6">
                        <p className="text-sm text-muted-foreground mb-2">Quote ID</p>
                        <p className="text-lg font-mono font-semibold text-primary">{id}</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-center text-muted-foreground">Quote review page - Coming soon</p>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <Button variant="outline" onClick={handleBackToHome} className="flex-1">
                            Back to Home
                        </Button>
                        <Button className="flex-1">Download Quote</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
