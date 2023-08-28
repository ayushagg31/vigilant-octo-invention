import React, { useState, useCallback } from 'react';

export const APILoaderContext = React.createContext({
    loader: false,
    addLoader: () => { },
    removeLoader: () => { }
});

export default function APILoaderProvider({ children }) {
    const [loader, setLoader] = useState(false);

    const removeLoader = () => setLoader(false);

    const addLoader = (message) => setLoader(true);

    const contextValue = {
        loader,
        addLoader: useCallback(() => addLoader(), []),
        removeLoader: useCallback(() => removeLoader(), [])
    };

    return (
        <APILoaderContext.Provider value={contextValue}>
            {children}
        </APILoaderContext.Provider>
    );
}