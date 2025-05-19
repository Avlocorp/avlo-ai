import React from 'react';

interface AvatarProps {
  name: string;
  photo?: string | null;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Function to generate color based on name (for consistent avatar colors)
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use primary color variants
  const hue = 230; // Approximate hue for primary blue
  const saturation = 25 + (Math.abs(hash) % 70); // 25-95%
  const lightness = 45 + (Math.abs(hash) % 30); // 45-75%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Get initials from a name
const getInitials = (name: string): string => {
  return name.split(' ').map(part => part[0]).join('').toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ 
  name,
  photo = null,
  initials,
  size = 'md',
  className = ''
}) => {
  // Determine size class
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const displayInitials = initials || getInitials(name);
  const avatarColor = stringToColor(name);
  
  return (
    <>
      {photo ? (
        <img 
          src={photo} 
          alt={name}
          className={`${sizeClass} rounded-full object-cover ${className}`}
          title={name}
        />
      ) : (
        <div 
          className={`${sizeClass} rounded-full flex items-center justify-center text-white font-medium ${className}`}
          style={{ backgroundColor: avatarColor }}
          title={name}
        >
          {displayInitials}
        </div>
      )}
    </>
  );
};

export default Avatar;