import React, { useState, useCallback } from 'react';

export const APIErrorContext = React.createContext({
    error: null,
    addError: (message) => { },
    removeError: () => { }
});

export default function APIErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const removeError = () => setError(null);

    const addError = (message) => setError({ message });

    const contextValue = {
        error,
        addError: useCallback((message) => addError(message), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <APIErrorContext.Provider value={contextValue}>
            {children}
        </APIErrorContext.Provider>
    );
}