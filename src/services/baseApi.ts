import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

type MethodsRequest = "POST" | "PUT" | "GET" | "DELETE";

function baseFetch<T, R>(url: string, method: MethodsRequest, data: T, options: AxiosRequestConfig): AxiosPromise<R> {
    let urlResult = process.env.REACT_APP_API_URL + url;
    return axios({
        url: urlResult,
        method,
        data,
        ...options
    })
}

function executeRequest<T, R = null>(
    method: MethodsRequest,
    pathname: string,
    data: T,
    options = {}
): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        return baseFetch<T, R>(pathname, method, data, options)
            .then((data: AxiosResponse<R>) => resolve(data.data))
            .catch((err: AxiosError) => {
                let code = err.code || '400';
                reject({
                    statusCode: code,
                    message: err.message
                });
            });
    });
}

const fetchApi = {
    get<R>(pathname: string, data = {}, options?: RequestInit) {
        return executeRequest<null, R>(
            "GET",
            pathname,
            null,
            options
        );
    },
    post<T, R>(pathname: string, data: T, options?: RequestInit) {
        return executeRequest<T, R>("POST", pathname, data, options);
    },

    put<T, R>(pathname: string, data: T, options?: RequestInit) {
        return executeRequest<T, R>("PUT", pathname, data, options);
    },

    delete<T, R>(pathname: string, data: T, options?: RequestInit) {
        return executeRequest<T, R>("DELETE", pathname, data, options);
    },
};

export default fetchApi;