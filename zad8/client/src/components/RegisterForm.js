import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error("Błąd rejestracji. Sprawdź dane.");
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.token);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Zarejestruj się</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default RegisterForm;

