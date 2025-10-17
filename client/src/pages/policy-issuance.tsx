import { useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2, FileDown, FileText, Mail } from 'lucide-react';

export default function PolicyIssuance() {
    const { id } = useParams();
    const [, navigate] = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header showCta={false} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
                        Policy Activated Successfully!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your insurance policy is now active and ready
                    </p>
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
                                <p className="font-semibold text-foreground">{id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                    Active
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Effective Date</p>
                                <p className="font-semibold text-foreground">2025-12-20</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                                <p className="font-semibold text-foreground">2026-12-20</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button className="w-full" size="lg">
                            <FileDown className="w-4 h-4 mr-2" />
                            Download Receipt
                        </Button>
                        <Button className="w-full" size="lg">
                            <FileText className="w-4 h-4 mr-2" />
                            Download Policy Document
                        </Button>
                    </div>
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
