import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { privateRoutes, publicRoutes } from "./data";
import PublicRoute from "./publicRoute";

import Login from "pages/Login";
import Sidebar from "components/layout/Sidebar";
import HeaderMain from "components/layout/Header";
import NotFound from "modules/NotFount";

const { Content } = Layout;

const RoutesWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const allRoutes = [...privateRoutes, ...publicRoutes];

  return (
    <div className="h-full bg-[#1A1A1D]">
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback="loading...">
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
      </Routes>

      {!isLoginPage && (
        <Layout className="h-screen flex overflow-hidden">
          <Sidebar />
          <Layout className="flex-1">
            <HeaderMain />
            <Content className="overflow-auto min-h-[calc(100vh-78px)] bg-[#1A1A1D]">
              <Routes>
                {allRoutes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    element={
                      <Suspense fallback="loading...">
                        <PublicRoute>
                          {route.element ? route.element : null}
                        </PublicRoute>
                      </Suspense>
                    }
                  >
                    {route.inner?.map((innerRoute, innerKey) => (
                      <Route
                        key={innerKey}
                        path={innerRoute.path}
                        element={
                          <Suspense fallback="loading...">
                            <PublicRoute>
                              {innerRoute.element ? innerRoute.element : null}
                            </PublicRoute>
                          </Suspense>
                        }
                      />
                    ))}
                  </Route>
                ))}
                <Route
                  path="*"
                  element={
                    <Suspense fallback="loading...">
                      <PublicRoute>
                        <NotFound />
                      </PublicRoute>
                    </Suspense>
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default RoutesWrapper;
