import React, { useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Trophy,
  Settings as SettingsIcon,
  UserRoundCheck,
  ChevronLeft,
  ChevronRight,
  LayoutDashboardIcon,
  Contact,
} from 'lucide-react';
import clsx from 'clsx';
import LogoIcon from 'assets/icons/LogoIcon';
import LogoText from 'assets/icons/LogoText';

interface SidebarProps {
  isMobile: boolean;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
  isCollapsed: boolean;
  onCollapseToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  isMobileOpen,
  onMobileToggle,
  isCollapsed,
  onCollapseToggle
}) => {
  const location = useLocation();

  // Memoize the resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && !isCollapsed) {
      onCollapseToggle(true);
    }
  }, [isCollapsed, onCollapseToggle]);

  // Effect for window resize handling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Memoize menu items to prevent recreation on each render
  const menuItems = useMemo(() => [
    { path: '/', icon: BarChart3, label: 'Overall Dashboard' },
    { path: '/pm/operators', icon: UserRoundCheck, label: 'Operators' },
    { path: '/pm/agents', icon: Contact, label: 'Leads' },
    { path: '/pm/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: "/pm/qadashboard", icon: LayoutDashboardIcon, label: 'QA Dashboard' },
  ], []);

  // Memoize settings item
  const settingsItem = useMemo(() => ({
    path: '/pm/settings',
    icon: SettingsIcon,
    label: 'Settings'
  }), []);

  // Early return for mobile closed state - AFTER all hooks are called
  if (isMobile && !isMobileOpen) {
    return null;
  }

  return (
    <div
      className={clsx(
        'bg-[#2c3e50] text-white min-h-screen fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-[70px]' : 'w-[250px]',
        isMobile && 'shadow-xl'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#34495e]">
        <div className={clsx(
          'font-bold transition-opacity duration-300 flex gap-2 items-center',
          isCollapsed && 'opacity-0 overflow-hidden'
        )}>
          <span className="w-[30px] h-[30px]">
            <LogoIcon h={30} w={30} />
          </span>
          <span className="text-[28.15px]">
            <LogoText />
          </span>
        </div>

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={() => onCollapseToggle(!isCollapsed)}
            className="p-2 rounded-full hover:bg-[#34495e] transition-colors cursor-pointer"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        )}

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={onMobileToggle}
            className="p-2 rounded-full hover:bg-[#34495e] transition-colors cursor-pointer"
            aria-label={'Close sidebar'}
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 flex flex-col">
        <div className="flex-1">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={clsx(
                'flex items-center px-4 py-3 transition-colors cursor-pointer relative group',
                location.pathname === path
                  ? 'bg-[#34495e] text-white'
                  : 'text-gray-300 hover:bg-[#34495e] hover:text-white'
              )}
              aria-label={label}
            >
              <Icon className={clsx('w-5 h-5', isCollapsed ? 'mx-auto' : 'mr-3')} />
              <span className={clsx(
                'transition-all duration-300',
                isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              )}>
                {label}
              </span>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Settings section */}
        <div className="mt-auto border-t border-[#34495e]">
          <Link
            to={settingsItem.path}
            className={clsx(
              'flex items-center px-4 py-3 transition-colors relative group cursor-pointer',
              location.pathname === settingsItem.path
                ? 'bg-[#34495e] text-white'
                : 'text-gray-300 hover:bg-[#34495e] hover:text-white'
            )}
            aria-label={settingsItem.label}
          >
            <settingsItem.icon className={clsx('w-5 h-5', isCollapsed ? 'mx-auto' : 'mr-3')} />
            <span className={clsx(
              'transition-all duration-300',
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            )}>
              {settingsItem.label}
            </span>

            {isCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-50">
                {settingsItem.label}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;