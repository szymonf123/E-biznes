import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = queryString.parse(window.location.search);

        if (token) {
            localStorage.setItem("authToken", token);
            navigate("/"); // przekierowanie do strony głównej
        } else {
            console.error("Brak tokena!");
        }
    }, [navigate]);

    return <div>Logowanie przez Google...</div>;
};

export default GoogleCallback;
