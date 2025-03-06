import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserState } from "services/api/auth";
// import { setUserState } from "services/api/auth";
import { useGetMeQuery } from "services/api/auth/Auth.api";

const RedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUserState({
          ...data,
          isAuthenticated: true,
        })
      );
      navigate("/pm");
    } else if (isError) {
      dispatch(
        setUserState({
          isAuthenticated: false,
        })
      );
      navigate("/auth/login");
    } else {
      console.log("loading");
    }
  }, [data, isLoading, isSuccess, isError]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h2 className="text-white text-3xl">Redirecting...</h2>
    </div>
  );
};

export default RedirectPage;
