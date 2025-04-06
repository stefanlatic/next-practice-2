'use client'
import { useAuth } from "@/app/context/authContext";
import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() { 

    const {loggedIn} = useAuth();

    if(loggedIn) {
        window.location.href = "/";
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = async (e) => {
        e.preventDefault();

        if(email === null || password === null) {
            alert("Enter email and password");
            return;
        }
        signInWithEmailAndPassword(auth, email, password);

    };

    return (
        <>
            <h2>Login</h2>
            <input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={userLogin}>Login</button>
        </>
    );
}