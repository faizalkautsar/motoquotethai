import { useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2, FileText, Loader2, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function PolicyIssuance() {
    const { id } = useParams();
    const [, navigate] = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        document.title = "Your Policy - MotoQuoteThai";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Fetch policy details from API
    const {
        data: policyData,
        isLoading,
        error,
    } = useQuery({
        queryKey: [`policy-${id}`],
        queryFn: async () => {
            const response = await apiRequest(
                'GET',
                `https://sandbox-bo.i2go.io/api/v3/policy-service/policies/${id}/?expand=current_version`
            );

            const data = await response.json();
            console.log(data);
            return data;
        },
        enabled: !!id, // Only run query if id exists
    });

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleDownloadPolicy = () => {
        const pdfUrl = policyData?.currentVersion?.pdfFileFullUrl;
        // const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Placeholder PDF URL

        if (pdfUrl) {
            // Open PDF in new tab
            window.open(pdfUrl, '_blank');

            // Show success toast
            toast({
                title: 'Opening Document',
                description: 'Your policy document is opening in a new tab.',
            });
        } else {
            // Show error toast if URL not available
            toast({
                title: 'Download Failed',
                description: 'Policy document URL is not available.',
                variant: 'destructive',
            });
        }
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
                            <h2 className="text-xl font-semibold text-primary mb-2">Loading Policy Details...</h2>
                            <p className="text-muted-foreground">Please wait while we fetch your policy information</p>
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
                            <h1 className="text-3xl font-bold text-primary mb-2">Error Loading Policy</h1>
                            <p className="text-muted-foreground">
                                {error instanceof Error ? error.message : 'Failed to load policy details'}
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

    const policy = {
        number: policyData?.number || id,
        status: policyData?.status || 'active',
        effectiveDate: policyData?.currentVersion?.startDate || '2025-12-20',
        expiryDate: policyData?.currentVersion?.endDate || '2026-12-20',
    }

    return (
        <div className="min-h-screen bg-background">
            <Header showCta={false} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Policy Activated Successfully!</h1>
                    <p className="text-lg text-muted-foreground">Your insurance policy is now active and ready</p>
                </div>

                {/* Policy Details Card */}
                <Card className="mb-6 border-2 border-accent/20">
                    <CardHeader className="bg-accent/5">
                        <h2 className="text-xl font-semibold text-primary">Policy Information</h2>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Policy Number</p>
                                <p className="font-semibold text-foreground">{policy.number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                    {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Effective Date</p>
                                <p className="font-semibold text-foreground">{policy.effectiveDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                                <p className="font-semibold text-foreground">{policy.expiryDate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
                            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                <li>Download and save your policy documents for your records</li>
                                <li>You will receive a confirmation email shortly</li>
                                <li>Keep your policy documents in a safe place</li>
                                <li>Contact us if you have any questions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={handleDownloadPolicy}>
                        <FileText className="w-4 h-4 mr-2" />
                        Download Policy Document
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Policy Document
                    </Button>
                    <Button variant="ghost" onClick={handleBackToHome} className="w-full mt-6">
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
