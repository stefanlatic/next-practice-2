'use client'
import { createContext, useContext, useEffect, useState }  from "react";
import { auth } from "@/app/lib/firebase";
import React from "react";

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(setupInitialUser);

    }, []);
    const setupInitialUser = async (authUser) => {
        if(authUser){
        setUser(authUser);
        setLoggedIn (true);
    }
    setIsLoading(false);

    }

    return (

        <AuthContext.Provider value={{user, loggedIn, isLoading}}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}