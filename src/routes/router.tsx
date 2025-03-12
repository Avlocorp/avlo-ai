import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "pages/Login";
import RedirectPage from "pages/redirect";
import LayoutComponent from "components/layout";
import PrivateRoute from "components/private-route";
import { lazy } from "react";

// Lazy-loaded components
const Home = lazy(() => import("pages/Home"));
const History = lazy(() => import("modules/History"));
const Settings = lazy(() => import("modules/settings/pages/account"));
const Billings = lazy(
  () => import("modules/billing/pages/billing-and-payments")
);
const CallCenter = lazy(() => import("modules/call-center/pages/analysis"));
const StatisticsPages = lazy(
  () => import("modules/Statistics/pages/List/list")
);
const Localization = lazy(() => import("modules/localization"));
const RedirectFromBitrix = lazy(() => import("pages/redirect-from-bitrix"));
const OperatorPage = lazy(() => import("modules/call-center/pages/operator"));
const AudioAnalyze = lazy(
  () => import("modules/call-center/pages/audio-analyze/audio-analyze")
);
const CallsList = lazy(() => import("modules/calls/list"));
const ClientsHistory = lazy(() => import("modules/client-history"));

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
          {
            index: true,
            element: <Home />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "statistics",
            element: <StatisticsPages />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "billings",
            element: <Billings />,
          },
          {
            path: "call-center",
            element: <CallCenter />,
          },
          {
            path: "call-center/operator/:operatorId",
            element: <OperatorPage />,
          },
          {
            path: "call-center/audio/:audioId",
            element: <AudioAnalyze />,
          },
          {
            path: "localization",
            element: <Localization />,
          },
          {
            path: "redirect",
            element: <RedirectFromBitrix />,
          },
          {
            path: "calls",
            element: <CallsList />,
          },
          {
            path: "calls-history",
            element: <ClientsHistory />,
          },
        ],
      },
    ],
  },
  {
    path: "auth/login",
    element: <Login />,
  },
]);

export default function BrowserRouter() {
  return <RouterProvider router={router} />;
}
