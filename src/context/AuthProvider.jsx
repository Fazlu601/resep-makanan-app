import React, { createContext, useState } from 'react'

export const AuthSessionContext = createContext();

function AuthProvider({children}) {
    const [session, setSession] = useState({});

    return (
        <AuthSessionContext.Provider value={{ session, setSession }}>
            {children}
        </AuthSessionContext.Provider>
    )
}

export default AuthProvider