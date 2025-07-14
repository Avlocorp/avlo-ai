import React from 'react';
import { Button } from 'antd';
import { useTheme } from 'services/contexts/ThemeContext';

interface SettingsButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    size?: 'small' | 'middle' | 'large';
    className?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
    onClick,
    icon,
    size = 'middle',
    className = ''
}) => {
    const { theme } = useTheme();

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        minWidth: '32px',
        padding: '0 8px',
        border: `1px solid ${theme === 'dark' ? '#4b5563' : '#d1d5db'}`,
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        color: theme === 'dark' ? '#f3f4f6' : '#374151',
        borderRadius: '6px',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
    };

    const hoverStyle = {
        borderColor: '#4338ca',
        backgroundColor: theme === 'dark' ? '#4b5563' : '#f8fafc',
        color: '#4338ca',
    };

    // Clone the icon and apply theme-aware color
    const styledIcon = React.cloneElement(icon as React.ReactElement, {
        style: {
            ...(icon as React.ReactElement).props?.style,
            color: theme === 'dark' ? '#f3f4f6' : '#374151',
            fontSize: '16px',
        }
    });

    return (
        <Button
            onClick={onClick}
            size={size}
            className={className}
            style={buttonStyle}
            onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, hoverStyle);
                // Update icon color on hover
                const iconElement = e.currentTarget.querySelector('span[role="img"]') as HTMLElement;
                if (iconElement) {
                    iconElement.style.color = '#4338ca';
                }
            }}
            onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, buttonStyle);
                // Reset icon color
                const iconElement = e.currentTarget.querySelector('span[role="img"]') as HTMLElement;
                if (iconElement) {
                    iconElement.style.color = theme === 'dark' ? '#f3f4f6' : '#374151';
                }
            }}
            aria-label="Settings"
        >
            {styledIcon}
        </Button>
    );
};

export default SettingsButton;