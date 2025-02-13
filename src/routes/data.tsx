import { lazy } from "react";

// Interface for route objects
export interface IRoute {
  path: string;
  element: React.ReactNode;
  inner?: IRoute[];
  index?: boolean;
}

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

// Route definitions
const privateRoutes: IRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/statistics",
    element: <StatisticsPages />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/billings",
    element: <Billings />,
  },
  {
    path: "/call-center",
    element: <CallCenter />,
  },
  {
    path: "/localization",
    element: <Localization />,
  },
];

const publicRoutes: IRoute[] = [];

export { privateRoutes, publicRoutes };

//  React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7.You can use the `v7_startTransition` future flag to opt -in early.For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
// warnOnce @react-router - dom.js ? v = b6508493 : 4374
// react - router - dom.js ? v = b6508493 : 4374 ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7.You can use the `v7_relativeSplatPath` future flag to opt -in early.For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.
