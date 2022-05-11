import { useCallback, useState } from 'react';

type UseBooleanFunctions = {
    setTrue: () => void;
    setFalse: () => void;
    toggleBoolean: () => void;
};

type UseBooleanType = [boolean, UseBooleanFunctions];

export const useBoolean = (defaultValue?: boolean): UseBooleanType => {
    const [value, setValue] = useState(!!defaultValue);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggleBoolean = useCallback(() => setValue((v) => !v), []);

    return [value, { setTrue, setFalse, toggleBoolean }];
};
