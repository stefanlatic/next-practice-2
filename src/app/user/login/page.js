'use client'
import { useState } from "react";

export default function Login() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");

    const userLogin = async (e) => {
        e.preventDefault();

        if(username === null || password === null) {
            alert("Niiste uneli username ili sifru");
            return;
        }
        try {
            const response = await fetch('/api/auth_user', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,  // emilys
                    password: password, // emilyspass
                })
            });
   
            if (!response.ok) {
                throw new Error("Login failed!");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);

            setMessage("Login successful!");

        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("Try again!");
        }
    };

    return (
        <>
            <h2>Login</h2>
            <input 
                type="text"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={userLogin}>Login</button>
            {message && <p>{message}</p>}
        </>
    );
}