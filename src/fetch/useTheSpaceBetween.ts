import {useCountdownTimer} from "../hooks";

type RequestUrl = string;
type RequestInitOptions = RequestInit | undefined;
type RequestBody = object | undefined;

/**HttpClient
 * > preconfigured fetch methods to resolve response as valid json objects
 * */
type HttpClient = {
    delete: (url: RequestUrl, options?: RequestInitOptions) => Promise<any>;
    get: (url: RequestUrl, options?: RequestInitOptions) => Promise<any>;
    patch: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
    post: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
    put: (url: RequestUrl, body: RequestBody, options?: RequestInitOptions) => Promise<any>;
};

/**TheSpaceBetween
 * > tools necessary to track a server session timer in the client application
 * */
type TheSpaceBetween = [
    sessionTimeRemaining: number,
    shouldWarn: boolean,
    isExpired: boolean,
    httpClient: HttpClient,
];

/**useTheSpaceBetween
 * > tool for tracking a server session timer in the client application.
 *
 * - uses fetch requests that resolve as valid json objects
 *
 * - allows function to be executed on response from server
 *
 * - allows function to be executed on error response from server
 * */
export const useTheSpaceBetween = (
    maxIdleTimeInSeconds: number,
    timeToWarnInSeconds: number,
    onIntercept?: () => void,
    onErrorIntercept?: () => void,
): TheSpaceBetween => {
    const [timeRemaining, restartCountdownTimer] = useCountdownTimer(maxIdleTimeInSeconds);

    const handleResponse = (response: Response): Promise<any> => {
        if (!!onIntercept) onIntercept();
        restartCountdownTimer(maxIdleTimeInSeconds);
        return Promise.resolve(response.json());
    };

    const handleError = (error: Error): Promise<never> => {
        if (!!onErrorIntercept) onErrorIntercept();
        return Promise.reject(error.message);
    }

    const httpClient: HttpClient = {
        delete: (url: RequestUrl, options: RequestInitOptions = undefined): Promise<any> => {
            return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                ...options,
                method: 'DELETE',
            }).then(handleResponse).catch(handleError);
        },
        get: (url: RequestUrl, options: RequestInitOptions = undefined): Promise<any> => {
            return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch',
                }),
                ...options,
                method: 'GET',
            }).then(handleResponse).catch(handleError);
        },
        patch: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
            return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                ...options,
                method: 'PATCH',
                body: JSON.stringify(body),
            }).then(handleResponse).catch(handleError);
        },
        post: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
            return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                ...options,
                method: 'POST',
                body: JSON.stringify(body),
            }).then(handleResponse).catch(handleError);
        },
        put: (url: RequestUrl, body: RequestBody, options: RequestInitOptions = undefined): Promise<any> => {
            return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                ...options,
                method: 'POST',
                body: JSON.stringify(body),
            }).then(handleResponse).catch(handleError);
        },
    };

    return [timeRemaining, timeRemaining <= timeToWarnInSeconds, timeRemaining <= 0, httpClient];
};
