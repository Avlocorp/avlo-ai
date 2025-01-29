import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./data"
import PublicRoute from "./publicRoute"
import NotFound from "modules/NotFount"

const Login = React.lazy(() => import("pages/Login"))

interface AnalysisData {
    // Add your analysis data type here
    [key: string]: any
}

interface RoutesWrapperProps {
    analysisData: AnalysisData | null
    setAnalysisData: (data: AnalysisData | null) => void
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({ analysisData, setAnalysisData }) => {
    const allRoutes = [...privateRoutes, ...publicRoutes]
    return (
        <div className="h-full">
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
                <Route path="/">
                    {allRoutes.map((route, idx) => (
                        <Route
                            key={idx}
                            path={route.path}
                            element={
                                <Suspense fallback="loading...">
                                    <PublicRoute>
                                        {React.cloneElement(route.element as React.ReactElement, {
                                            analysisData,
                                            setAnalysisData,
                                        })}
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
                                                {React.cloneElement(innerRoute.element as React.ReactElement, {
                                                    analysisData,
                                                    setAnalysisData,
                                                })}
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
                </Route>
            </Routes>
        </div>
    )
}

export default RoutesWrapper

