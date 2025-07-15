import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as antdTheme, Spin } from "antd";
import LayoutComponent from "components/layout";
import PrivateRoute from "components/private-route";
import { lazy, Suspense } from "react";
import { useTheme } from "services/contexts/ThemeContext";

const History = lazy(() => import("modules/History"));
const Settings = lazy(() => import("modules/settings/index"));
const ClientDetailsPage = lazy(() => import("modules/lead-new/ClientDetailsPage"));
const LeaderboardPage = lazy(() => import("modules/leaderboard"));
const Billings = lazy(() => import("modules/billing/pages/billing-and-payments"));
const DashboardStatistics = lazy(() => import("modules/Statistics"));
const BusinessDashboard = lazy(() => import("pages/Home/home"));
const CallCenter = lazy(() => import("modules/call-center/pages/analysis"));
const Localization = lazy(() => import("modules/localization"));
const RedirectFromBitrix = lazy(() => import("pages/redirect-from-bitrix"));
const OperatorPage = lazy(() => import("modules/call-center/pages/operator"));
const AudioAnalyze = lazy(() => import("modules/call-center/pages/audio-analyze/audio-analyze"));
const ClientsHistory = lazy(() => import("modules/client-history"));
const LeadsList = lazy(() => import("modules/lead-new/LeadsPage"));
const QaPage = lazy(() => import("modules/qa/index"));
const Login = lazy(() => import("pages/Login"));
const RedirectPage = lazy(() => import("pages/redirect"));
const NotFound = lazy(() => import("modules/NotFount"));
const QAdashboard = lazy(() => import("modules/QAdashboard/index"));
const UserManage = lazy(() => import("modules/settings/pages/operator-list"));
const OperatorsDashboard = lazy(() => import("modules/operators/index"));

// Loading component with dark mode support
function LoadingFallback() {
  const { theme } = useTheme();

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    flexDirection: "column" as const,
    gap: "16px",
  };

  const textStyle = {
    color: theme === "dark" ? "#f3f4f6" : "#111827",
    fontSize: "16px",
    fontWeight: "500",
  };

  const spinnerStyle = {
    color: "#4338ca",
  };

  return (
    <div style={containerStyle}>
      <Spin
        size="large"
        style={spinnerStyle}
      />
      <div style={textStyle}>Loading...</div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <RedirectPage />,
      },
      {
        path: "pm",
        element: (
          <PrivateRoute>
            <LayoutComponent />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <BusinessDashboard /> },
          { path: "history", element: <History /> },
          { path: "statistics", element: <DashboardStatistics /> },
          { path: "settings", element: <Settings /> },
          { path: "operators", element: <OperatorsDashboard /> }, // Redirect to operators page
          { path: "settings/user-manage", element: <UserManage /> },
          { path: "billings", element: <Billings /> },
          { path: "call-center", element: <CallCenter /> },
          { path: "call-center/operator/:operatorId", element: <OperatorPage /> },
          { path: "call-center/audio/:audioId", element: <AudioAnalyze /> },
          { path: "localization", element: <Localization /> },
          { path: "redirect", element: <RedirectFromBitrix /> },
          { path: "calls-history/:phone", element: <ClientsHistory /> },
          { path: "leads", element: <LeadsList /> },
          { path: "client/:leadId", element: <ClientDetailsPage /> },
          { path: "leaderboard", element: <LeaderboardPage /> },
          { path: "qa", element: <QaPage /> },
          { path: "qadashboard", element: <QAdashboard /> },
        ],
      },
    ],
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <PrivateRoute>
        <LayoutComponent />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
]);

export default function BrowserRouter() {
  const { theme } = useTheme();

  // Theme configuration for Ant Design
  const getThemeConfig = () => {
    if (theme === "dark") {
      return {
        algorithm: antdTheme.darkAlgorithm,
        token: {
          colorPrimary: "#4338ca",
          borderRadius: 8,
          colorBgContainer: "#374151",
          colorBgElevated: "#374151",
          colorBgLayout: "#1f2937",
          colorText: "#f3f4f6",
          colorTextSecondary: "#9ca3af",
          colorBorder: "#4b5563",
        },
      };
    }

    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: "#4338ca",
        borderRadius: 8,
        colorBgContainer: "#ffffff",
        colorBgElevated: "#ffffff",
        colorBgLayout: "#f9fafb",
        colorText: "#111827",
        colorTextSecondary: "#6b7280",
        colorBorder: "#d1d5db",
      },
    };
  };

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  );
}