import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Loader2, ShieldCheck, Shield, Car } from 'lucide-react';

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
    const [paymentPeriod, setPaymentPeriod] = useState<'yearly' | 'monthly'>('yearly');

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

    // Transform rating data into quote cards
    const getQuoteCards = () => {
        if (!quoteData?.rating) return [];

        const ratingKeys = Object.keys(quoteData.rating);
        return ratingKeys.map((key) => {
            const ratingData = (quoteData.rating as any)[key];
            const yearlyData = ratingData.yearly;
            const monthlyData = ratingData.monthly;

            // Map coverage type to display names and icons
            const typeMapping: { [key: string]: { title: string; subtitle: string; Icon: any } } = {
                comprehensive: { title: 'Type 1', subtitle: 'Comprehensive Insurance', Icon: ShieldCheck },
                '2-plus': { title: 'Type 2+', subtitle: 'Enhanced Coverage', Icon: Shield },
                '3-plus': { title: 'Type 3+', subtitle: 'Premium Third Party', Icon: Shield },
                'third-party-only': { title: 'Third Party', subtitle: 'Basic Coverage', Icon: Car },
                'third-party-bodily-injury-and-death': {
                    title: 'Third Party Plus',
                    subtitle: 'Bodily Injury & Death',
                    Icon: Shield,
                },
            };

            const displayInfo = typeMapping[key] || { title: key, subtitle: 'Insurance Coverage', Icon: Shield };

            // Build features based on coverage details
            const coverage = ratingData.coverage || {};
            const features = [
                {
                    text: coverage.ownDamageCoverage
                        ? `Own damage up to ฿${coverage.ownDamageCoverage?.toLocaleString()}`
                        : 'No own damage coverage',
                    available: !!coverage.ownDamageCoverage,
                },
                {
                    text: `Third-party liability ฿${coverage.thirdPartyLiability?.toLocaleString() || '0'}`,
                    available: !!coverage.thirdPartyLiability,
                },
                {
                    text: coverage.floodCoverage ? 'Flood coverage included' : 'No flood coverage',
                    available: coverage.floodCoverage || false,
                },
                {
                    text: coverage.theftProtection ? 'Theft protection included' : 'No theft protection',
                    available: coverage.theftProtection || false,
                },
                {
                    text: coverage.authorizedRepairShop ? 'Authorized repair shop' : 'Any repair shop',
                    available: coverage.authorizedRepairShop || false,
                },
                {
                    text: `Deductible: ฿${coverage.deductible?.toLocaleString() || '0'}`,
                    available: true,
                },
            ];

            return {
                type: key,
                title: displayInfo.title,
                subtitle: displayInfo.subtitle,
                Icon: displayInfo.Icon,
                price: yearlyData.totalPayableAmount,
                monthlyPrice: Math.round(monthlyData.totalPayableAmount),
                recommended: key === 'comprehensive',
                features,
            };
        });
    };

    const quoteCards = getQuoteCards();

    return (
        <div className="min-h-screen bg-background">
            <Header showCta={false} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header Section */}
                <div className="px-6 sm:px-8 py-8 mb-8">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Quote Generated Successfully!</h1>
                        <p className="text-lg text-muted-foreground">Your insurance quote is ready for review</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Quote Number</div>
                            <div className="font-semibold text-foreground text-sm">{quoteData?.number || id}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Status</div>
                            <div className="font-semibold text-foreground">{quoteData?.status || 'Pending'}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Policy Term</div>
                            <div className="font-semibold text-foreground">{quoteData?.policyTerm || 'Yearly'}</div>
                        </div>
                        <div className="bg-background rounded-lg p-4 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 font-medium">Coverage Period</div>
                            <div className="font-semibold text-foreground text-sm">
                                {quoteData?.startDate} to {quoteData?.endDate}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Period Toggle */}
                <div className="px-6 sm:px-8 py-6 mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-sm text-foreground font-medium">Payment:</span>
                        <div className="inline-flex rounded-lg border border-border p-1 bg-white">
                            <Button
                                variant={paymentPeriod === 'yearly' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setPaymentPeriod('yearly')}
                            >
                                Yearly
                            </Button>
                            <Button
                                variant={paymentPeriod === 'monthly' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setPaymentPeriod('monthly')}
                            >
                                Monthly
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Quote Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {quoteCards.map((coverage) => {
                        const displayPrice = paymentPeriod === 'yearly' ? coverage.price : coverage.monthlyPrice;
                        const period = paymentPeriod === 'yearly' ? '/year' : '/month';

                        return (
                            <Card
                                key={coverage.type}
                                className={`${coverage.recommended ? 'border-2 border-primary shadow-lg' : 'border border-border'} hover:shadow-xl transition-all cursor-pointer group bg-white`}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <coverage.Icon className="w-8 h-8 text-accent" />
                                        {coverage.recommended && (
                                            <span className="relative px-3 py-1.5 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white text-xs font-semibold rounded-full shadow-lg overflow-hidden before:absolute before:inset-0 before:rounded-full before:p-[1.5px] before:bg-gradient-to-r before:from-yellow-400 before:via-amber-400 before:to-yellow-500 before:-z-10">
                                                <span className="relative z-10">Recommended</span>
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-primary mb-2">
                                        {coverage.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">{coverage.subtitle}</p>
                                </CardHeader>

                                <CardContent className="pt-6">
                                    <div className="space-y-3 mb-6">
                                        {coverage.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start space-x-2 text-sm">
                                                <i className={`fas ${feature.available ? 'fa-check-circle text-accent' : 'fa-times-circle text-muted-foreground/50'} mt-0.5`}></i>
                                                <span className={feature.available ? 'text-foreground' : 'text-muted-foreground line-through'}>
                                                    {feature.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="text-sm text-muted-foreground mb-2">Starting from</div>
                                        <div className="flex items-end mb-4">
                                            <span className="text-3xl font-bold text-primary">฿{displayPrice.toLocaleString()}</span>
                                            <span className="text-muted-foreground ml-2 mb-1">{period}</span>
                                        </div>
                                        {paymentPeriod === 'yearly' && (
                                            <div className="text-sm text-muted-foreground">or ฿{coverage.monthlyPrice.toLocaleString()}/month</div>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        onClick={() => console.log('Selected plan:', coverage.type)}
                                        variant={coverage.recommended ? 'default' : 'outline'}
                                        className="w-full"
                                    >
                                        Select Plan
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Additional Coverage Details */}
                {/* {quoteData?.attributes && quoteData.attributes.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg border border-border p-6 mb-8">
                        <h2 className="text-xl font-bold text-primary mb-4">Additional Coverage Options</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {quoteData.attributes.map((attr: any, idx: number) => (
                                <div key={idx} className="bg-background rounded-lg p-4 border border-border">
                                    <div className="text-sm font-medium text-muted-foreground mb-1">{attr.key_display}</div>
                                    <div className="text-lg font-semibold text-foreground">{attr.value_display}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* Important Note */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start space-x-3">
                        <i className="fas fa-info-circle text-amber-600 text-xl mt-0.5"></i>
                        <div>
                            <h4 className="font-semibold text-amber-900 mb-1">Important Note</h4>
                            <p className="text-sm text-amber-800">
                                Prices shown are estimates based on the information provided. Actual prices may vary based on
                                additional conditions. Please contact our team for an accurate quote.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={handleBackToHome} className="flex-1">
                        Back to Home
                    </Button>
                    <Button className="flex-1">
                        <i className="fas fa-check-circle mr-2"></i>
                        Activate Quote
                    </Button>
                </div>
            </div>
        </div>
    );
}
