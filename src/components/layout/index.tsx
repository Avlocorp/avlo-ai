import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const LayoutComponent: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className={`flex h-screen bg-gray-50 `}>

      {!isMobile && (
        <Sidebar
          isMobile={false}
          isMobileOpen={true}
          onMobileToggle={() => { }}
        />
      )}

      {isMobile && isMobileOpen && (
        <Sidebar
          isMobile={true}
          isMobileOpen={isMobileOpen}
          onMobileToggle={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : 'ml-[70px] md:ml-[250px]'}`}>
        {isMobile && (
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <h1 className="text-xl font-bold text-gray-800 dark:text-white">SDR Dashboard</h1>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default LayoutComponent;
