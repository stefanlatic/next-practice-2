'use client'
import { useAuth } from "@/app/context/authContext";
import { auth } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Register() {

    const { user, loggedIn } = useAuth();

    if(loggedIn) {
        window.location.href = "/";
    }
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const register = async(e) => {
        e.preventDefault();
        console.log(email, password);
       
    await createUserWithEmailAndPassword(auth, 'stefanlatic2002@gmail.com', '12345678');
    }

    return <>
    <h1>Welcome to Product Store, Log In</h1>
    <input type="text" placeholder="email"  onChange={e => setEmail(e.currentTarget.value)}/>
    <input type="password" placeholder="password"  onChange={e => setPassword(e.currentTarget.value)}/>
    <button onClick={e => register(e)}>Register</button>
    </>
}