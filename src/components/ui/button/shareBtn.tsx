import ShareIcon from 'assets/icons/ShareIcon';
import React, { useState, useRef, useEffect } from 'react';

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
    className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url, className }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => setShowTooltip(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setShowTooltip(true);
            } catch (err) {
                console.error('Could not copy text: ', err);
            }
        }
    };


    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleShare}
                className={`px-4 py-2 bg-[#2A2A2D] items-center flex border border-[#343436] gap-2 rounded-full hover:bg-[#3A3A3D] transition-colors duration-200 ${className || ''}`}
                aria-label="Share or Invite"
            >
                <ShareIcon />
                <span className="text-white text-sm font-medium">
                    Invite
                </span>
            </button>
            {showTooltip && (
                <div
                    ref={tooltipRef}
                    className="absolute left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md z-20"
                    style={{
                        bottom: buttonRef.current ? `calc(100% + ${buttonRef.current.offsetHeight}px + 0.5rem)` : '100%'
                    }}
                    role="tooltip"
                    aria-live="polite"
                >
                    Link copied!
                </div>
            )}
        </div>
    );
};

export default ShareButton;
