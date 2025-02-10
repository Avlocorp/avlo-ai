import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { privateRoutes, publicRoutes } from "./data";
import PublicRoute from "./publicRoute";

import Login from "pages/Login";
import Sidebar from "components/layout/Sidebar";
import HeaderMain from "components/layout/Header";
import NotFound from "modules/NotFount";

const { Content } = Layout;

interface AnalysisData {
    [key: string]: any;
}

interface RoutesWrapperProps {
    analysisData: AnalysisData | null;
    setAnalysisData: (data: AnalysisData | null) => void;
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({ analysisData, setAnalysisData }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    useEffect(() => {
        const storedData = sessionStorage.getItem("analysisData");
        if (storedData) {
            setAnalysisData(JSON.parse(storedData));
        }
    }, []);

    const updateAnalysisData = (newData: AnalysisData | null) => {
        setAnalysisData(newData);
        if (newData) {
            sessionStorage.setItem("analysisData", JSON.stringify(newData));
        } else {
            sessionStorage.removeItem("analysisData");
        }
    };

    const clearAnalysisData = () => {
        updateAnalysisData(null);
    };

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
                        <HeaderMain onClearAnalysis={clearAnalysisData} />
                        <Content className="overflow-auto min-h-[calc(100vh-78px)] bg-[#1A1A1D]">
                            <Routes>
                                {allRoutes.map((route, idx) => (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={
                                            <Suspense fallback="loading...">
                                                <PublicRoute>
                                                    {route.element ? React.cloneElement(route.element as React.ReactElement, {
                                                        analysisData,
                                                        setAnalysisData,
                                                    }) : null}
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
                                                            {innerRoute.element ? React.cloneElement(innerRoute.element as React.ReactElement, {
                                                                analysisData,
                                                                setAnalysisData,
                                                            }) : null}
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
