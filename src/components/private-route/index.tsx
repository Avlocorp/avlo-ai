import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUserState } from "services/api/auth";
// import { setUserState } from "services/api/auth";
import { useGetMeQuery } from "services/api/auth/Auth.api";
import { RootState } from "store";

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

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
    return <div>Loading...</div>;
  }

  if (isAuthorized) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
