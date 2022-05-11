import { Dispatch, SetStateAction, useState } from 'react';

type UseCountdownFunctions = {
    setCount: Dispatch<SetStateAction<number>>;
    decrement: () => void;
    reset: (time: number) => void;
};

type UseCountdownType = [number, UseCountdownFunctions];

export const useCountdown = (startingTime: number): UseCountdownType => {
    const [count, setCount] = useState<number>(startingTime);

    const decrement = () => {
        if (count !== 0) {
            setCount(count - 1);
        }
    };
    const reset = (time: number) => setCount(time);

    return [
        count,
        {
            decrement,
            reset,
            setCount,
        },
    ];
};
