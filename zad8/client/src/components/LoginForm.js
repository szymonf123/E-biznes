import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error("Błąd logowania. Sprawdź dane.");
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/auth/google";
    };
    const handleGithubLogin = () => {
        window.location.href = "http://localhost:8000/api/auth/github";
    };

    return (
        <div>
            <h2>Zaloguj się</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Login:
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Hasło:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit">Zaloguj się</button>
            </form>
            <hr />
            <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
                Zaloguj się przez Google
            </button>
            <button
                onClick={handleGithubLogin}
                className="bg-gray-800 text-white p-2 rounded flex items-center space-x-2"
            >
                <span>Zaloguj przez GitHub</span>
            </button>
        </div>
    );
};

export default LoginForm;
