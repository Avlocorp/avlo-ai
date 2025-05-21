import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "pages/Login";
import RedirectPage from "pages/redirect";
import LayoutComponent from "components/layout";
import PrivateRoute from "components/private-route";
import { lazy } from "react";
import QaPage from "modules/qa";
import NotFound from "modules/NotFount";

const History = lazy(() => import("modules/History"));
const Settings = lazy(() => import("modules/settings/pages/account"));
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
  return <RouterProvider router={router} />;
}
