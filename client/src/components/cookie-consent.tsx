import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('cookieConsent');
        if (!hasAccepted) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-border shadow-lg animate-in slide-in-from-bottom">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            We use cookies
                        </h3>
                        <p className="text-base text-muted-foreground">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                            By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            size="default"
                            onClick={handleDecline}
                            className="flex-1 sm:flex-none"
                        >
                            Decline
                        </Button>
                        <Button
                            size="default"
                            onClick={handleAccept}
                            className="flex-1 sm:flex-none"
                        >
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
            <button
                onClick={handleDecline}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cookie banner"
            >
                <X className="w-4 h-4 text-muted-foreground" />
            </button>
        </div>
    );
}
