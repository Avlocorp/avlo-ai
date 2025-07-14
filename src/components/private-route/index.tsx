import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUserState } from "services/api/auth";
import { useGetMeQuery } from "services/api/auth/Auth.api";
import { RootState } from "store";
import { Spin } from "antd";
import { useTheme } from "services/contexts/ThemeContext";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const { theme } = useTheme();

  const { data, isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: user.isAuthenticated,
  });

  const isAuthorized = user.isAuthenticated || isSuccess;

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUserState({
          ...data,
          isAuthenticated: true,
        })
      );
    } else if (isError) {
      dispatch(
        setUserState({
          isAuthenticated: false,
        })
      );
    }
  }, [data, isLoading, isSuccess, isError]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Spin size="large" style={{ color: "#4338ca" }} />
        <div
          style={{
            color: theme === "dark" ? "#f3f4f6" : "#111827",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

export default PrivateRoute;
