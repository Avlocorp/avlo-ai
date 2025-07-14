import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from 'services/contexts/ThemeContext';

const LayoutComponent: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 480;
      setIsMobile(mobile);
      // Auto-collapse on small screens
      if (window.innerWidth < 768 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isCollapsed]);

  useEffect(() => {
    if (isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [location, isMobile]);

  const containerStyle = {
    backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
  };

  const headerStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    color: theme === 'dark' ? '#f3f4f6' : '#111827',
  };

  // Calculate margin based on sidebar state
  const getMainContentMargin = () => {
    if (isMobile) return 'ml-0';
    return isCollapsed ? 'ml-[70px]' : 'ml-[250px]';
  };

  return (
    <div className={`flex h-screen`} style={containerStyle}>
      {!isMobile && (
        <Sidebar
          isMobile={false}
          isMobileOpen={true}
          onMobileToggle={() => { }}
          isCollapsed={isCollapsed}
          onCollapseToggle={setIsCollapsed}
        />
      )}

      {isMobile && isMobileOpen && (
        <Sidebar
          isMobile={true}
          isMobileOpen={isMobileOpen}
          onMobileToggle={() => setIsMobileOpen(false)}
          isCollapsed={false}
          onCollapseToggle={() => { }}
        />
      )}

      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${getMainContentMargin()}`}>
        {isMobile && (
          <div style={headerStyle} className="sticky top-0 z-10 shadow-sm p-4 flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
              aria-label="Open menu"
              style={{
                backgroundColor: theme === 'dark' ? '#4b5563' : 'transparent',
              }}
            >
              <Menu className="w-5 h-5" style={{ color: theme === 'dark' ? '#f3f4f6' : '#111827' }} />
            </button>

            <h1 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#f3f4f6' : '#111827' }}>
              SDR Dashboard
            </h1>
          </div>
        )}

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;