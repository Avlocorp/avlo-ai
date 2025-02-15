import { Spin } from "antd";
import qs from "qs";
import { Navigate, useLocation } from "react-router-dom";
import { useVerifyBitrixAccountQuery } from "services/api/auth/Auth.api";
import DashboardError from "./integration-error";

const RedirectFromBitrix = () => {
  const location = useLocation();
  const { code, domain, member_id } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(code, domain, member_id);

  const { data, isSuccess, isError, error } = useVerifyBitrixAccountQuery({
    code: code as string,
    url: domain as string,
    member_id: member_id as string,
  });
  console.log(data, error);

  if (isSuccess) return <Navigate to="/login" replace />;
  if (isError && (error as { status: number }).status === 401)
    return <Navigate to="/login" />;
  if (isError) return <DashboardError />;

  return (
    <div className="absolute inset-0 w-screen h-screen flex items-center justify-center bg-[#2A2A2D] z-10">
      <Spin />
    </div>
  );
};

export default RedirectFromBitrix;
