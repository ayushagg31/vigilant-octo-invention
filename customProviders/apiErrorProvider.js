import React, { useState, useCallback } from 'react';

export const APIErrorContext = React.createContext({
    error: {
        message: null,
        type: null
    },
    addError: (message, type = null) => { },
    removeError: () => { }
});

export default function APIErrorProvider({ children }) {
    const [error, setError] = useState(null);

    const removeError = () => setError(null);

    const addError = (message, type = null) => setError({ message, type });

    const contextValue = {
        error,
        addError: useCallback((message, type) => addError(message, type), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <APIErrorContext.Provider value={contextValue}>
            {children}
        </APIErrorContext.Provider>
    );
}