import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useCountdownTimer} from "../hooks";

/**TheSpaceBetween
 * > tools necessary to track a server session timer in the client application
 * */
type TheSpaceBetween = [
    sessionTimeRemaining: number,
    shouldWarn: boolean,
    isExpired: boolean,
    httpClient: AxiosInstance,
];

/**useTheSpaceBetween
* > tool for tracking a server session timer in the client application.
 *
* - uses axios requests with option to configure the AxiosInstance
 *
* - allows function to be executed on axios response intercept
 *
* - allows function to be executed on axios error intercept
 * */
export const useTheSpaceBetween = (
    maxIdleTimeInSeconds: number,
    timeToWarnInSeconds: number,
    axiosConfig?: AxiosRequestConfig,
    onIntercept?: () => void,
    onErrorIntercept?: () => void,
): TheSpaceBetween => {
    const [timeRemaining, restartCountdownTimer] = useCountdownTimer(maxIdleTimeInSeconds);
    const interceptor = (response: AxiosResponse): any => {
        restartCountdownTimer(maxIdleTimeInSeconds);
        if (!!onIntercept) onIntercept();
        return response.data;
    };

    const errorInterceptor = (error: any): Promise<any> => {
        if (!!onErrorIntercept) {
            onErrorIntercept();
        }
        return Promise.reject(error.message);
    };

    const httpClient = axios.create(axiosConfig);

    httpClient.interceptors.response.use(interceptor, errorInterceptor);

    return [timeRemaining, timeRemaining <= timeToWarnInSeconds, timeRemaining <= 0, httpClient];
};
