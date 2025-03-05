import React from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";

import HomeIcon from "assets/icons/HomeIcon";
import HistoryIcon from "assets/icons/HistoryIcon";
import SettingIcon from "assets/icons/SettingIcon";
import LogoIcon from "assets/icons/LogoIcon";
import LogoText from "assets/icons/LogoText";
import HistoryIconinSidebar from "assets/icons/HistoryIconinSidebar";
import { ACCESS_TOKEN_KEY } from "config";
import { MessageCircleHeart } from "lucide-react";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const hasToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);

  return (
    <Sider
      className="h-screen bg-[#2A2A2D] top-0 left-0 z-20 flex flex-col"
      width={300}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 flex-grow">
          <div className="pt-8 mb-6 text-white text-xl font-bold flex items-center space-x-2">
            <span className="w-[30px] h-[30px]">
              <LogoIcon h={30} w={30} />
            </span>
            <span className="text-[28.15px]">
              <LogoText />
            </span>
          </div>
          <div className="space-y-2">
            <NavLink
              to="/"
              className="w-full text-[#fff] text-[16px] flex items-center gap-3 px-3 py-2 rounded-lg"
              style={({ isActive }) => ({
                background: isActive
                  ? "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                  : "#3A3A41",
              })}
            >
              {({ isActive }) => (
                <>
                  <HomeIcon isActive={isActive} />
                  <span>Home</span>
                </>
              )}
            </NavLink>

            {hasToken && (
              <NavLink
                to="/statistics"
                className="w-full text-[#fff] text-[16px] flex items-center gap-3 px-3 py-2 rounded-lg"
                style={({ isActive }) => ({
                  background: isActive
                    ? "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                    : "#3A3A41",
                })}
              >
                {({ isActive }) => (
                  <>
                    <HistoryIcon isActive={isActive} />
                    <span>Dashboard</span>
                  </>
                )}
              </NavLink>
            )}

            {hasToken && (
              <NavLink
                to="/call-center"
                className="w-full text-[#fff] text-[16px] flex items-center gap-3 px-3 py-2 rounded-lg"
                style={({ isActive }) => ({
                  background: isActive
                    ? "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                    : "#3A3A41",
                })}
              >
                {({ isActive }) => (
                  <>
                    <MessageCircleHeart
                      className={isActive ? "text-[#FFFFFF]" : "text-[#A099FF]"}
                    />
                    <span>Call centre</span>
                  </>
                )}
              </NavLink>
            )}

            {hasToken && (
              <NavLink
                to="/history"
                className="w-full text-[#fff] text-[16px] flex items-center gap-3 px-3 py-2 rounded-lg"
                style={({ isActive }) => ({
                  background: isActive
                    ? "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                    : "#3A3A41",
                })}
              >
                {({ isActive }) => (
                  <>
                    <HistoryIconinSidebar isActive={isActive} />
                    <span>History</span>
                  </>
                )}
              </NavLink>
            )}
          </div>
        </div>

        {hasToken && (
          <div className="px-6 mt-auto mb-6">
            <NavLink
              to="/settings"
              className="w-full text-[#fff] mb-6 text-[16px] flex gap-3 items-center px-3 py-2 rounded-lg "
              style={({ isActive }) => ({
                background: isActive
                  ? "radial-gradient(336.58% 92.18% at 88.69% 70%, #52E0FF 0%, #5B9BEC 44.57%, #757AFF 100%), #A099FF"
                  : "#3A3A41",
              })}
            >
              {({ isActive }) => (
                <>
                  <SettingIcon isActive={isActive} />
                  <span className="ml-2">Settings</span>
                </>
              )}
            </NavLink>

          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
