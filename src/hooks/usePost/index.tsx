import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { queryBuilder } from "../../services";
import { TMethod, TParams } from "../../services/types";
import api from "../../services/api/index";
interface IPostOptions {
    method: TMethod;
    url: string;
    data: any;
    params?: TParams | undefined;
    config?: AxiosRequestConfig;
}
interface IPostProps {
    onSuccess?: (data: object) => unknown;
    onError?: (error: object) => unknown;
}

export function postData(options: IPostOptions) {
    const { method = "post", url, data, params, config } = options;
    return api[method](queryBuilder(url, params), data, config);
}

const usePost = ({ onSuccess, onError, ...params }: IPostProps = {}) => {
    return useMutation({
        mutationFn: postData,
        onSuccess: onSuccess,
        onError: onError,
        ...params,
    });
};

export default usePost;
