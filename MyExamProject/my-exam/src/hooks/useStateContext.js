import React, { createContext, useContext, useState, useEffect } from 'react'


const stateContext = createContext();

const getFreshContext = () => {
    return {
        id: 0,
        selectedOptions: []
    }
}

export default function useStateContext() {
    const { context, setContext } = useContext(stateContext)
    return {
        context,
        setContext: obj => {
            setContext({ ...context, ...obj })
        },
        resetContext: () => {
            localStorage.removeItem('context')
            setContext(getFreshContext())
        }
    };
}

export function ContextProvider({ children }) {
    const [context, setContext] = useState(getFreshContext())

    // useEffect(() => {
    //     localStorage.setItem('context', JSON.stringify(context))
    // }, [context])

    return (
        <stateContext.Provider value={{ context, setContext }}>
            {children}
        </stateContext.Provider>
    )
}
