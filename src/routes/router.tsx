import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutComponent from "components/layout";
import PrivateRoute from "components/private-route";
import { lazy } from "react";


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
  return <RouterProvider router={router} />;
}
