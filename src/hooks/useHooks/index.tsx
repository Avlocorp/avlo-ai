import dayjs from "dayjs";
import lodash from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import qs from "qs";

const useHooks = () => {
    const navigate = useNavigate();
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const params = useParams();
    const dateConverter = (
        date: number | undefined,
        expectingType: "string" | "object",
        format?: string | undefined
    ) => {
        if (expectingType === "string")
            return date ? dayjs.unix(+date).format(format) : null;
        else if (expectingType === "object") return date ? dayjs.unix(+date) : null;
        return null;
    };

    return {
        query,
        params,
        location,
        dateConverter,
        navigate,
        qs,
        ...lodash,
    };
};

export default useHooks;
