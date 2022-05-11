import { useBoolean } from './useBoolean';
import { useCountdown } from './useCountdown';
import { useInterval } from './useInterval';
import { useEffect } from 'react';

type UseCountdownType = [number, (time: number) => void];

export const useCountdownTimer = (maxIdleTime: number): UseCountdownType => {
    const [count, { decrement, reset }] = useCountdown(maxIdleTime);
    const oneSecondIntervalInMilliseconds = 1000;

    useEffect(() => {
        if (count === 0) {
            stop();
        }
    }, [count]);

    const [isRunning, { setTrue: start, setFalse: stop }] = useBoolean(true);

    const restart = (time: number) => {
        reset(time);
        start();
    };

    useInterval({ callback: decrement, delay: isRunning ? oneSecondIntervalInMilliseconds : null });

    return [count, restart];
};
