import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { RootState } from "store";
interface IProps {
    children: JSX.Element;
}

function Private({ children }: IProps) {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return children;
    }
    return <Navigate to="/login" />;
}

export default Private;
