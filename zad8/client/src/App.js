import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import GoogleCallback from "./components/GoogleCallback";
import LLM from "./components/LLM";
import "./index.css";

const App = () => {
    return (
        <Router>
            <div>
                <h1>Moja aplikacja</h1>
                <nav>
                    <a href="/">Home</a> -
                    <a href="/login">Login</a> -
                    <a href="/register">Rejestracja</a> -
                    <a href="/llm">Asystent AI</a>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/llm" element={<LLM />} />
                    <Route path="/google/callback" element={<GoogleCallback />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

