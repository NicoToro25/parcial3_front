import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Especialidades = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch("https://reservaslaboratorio-gxcchtasbtbehreq.eastus2-01.azurewebsites.net/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json().then(data => ({ status: response.status, body: data }));
                }
                return response.text().then(text => ({ status: response.status, body: { message: text } }));
            })
            .then(({ status, body }) => {
                if (status !== 200) {
                    throw new Error(body.message || "Error desconocido");
                }

                // Guardar ID y rol en localStorage
                localStorage.setItem("userId", body.id);
                localStorage.setItem("userRole", body.role);
                localStorage.setItem("userName", body.name)
                alert("✅ Bienvenido");

                // 🔹 Redirigir según el rol, incluyendo la ID en la ruta
                if (body.role === "Administrator") {
                    navigate(`/Manager?userId=${body.id}`);
                } else if (body.role === "Teacher") {
                    navigate(`/Professor?userId=${body.id}`);
                } else {
                    alert("⚠️ Rol desconocido. Contacta al administrador.");
                }
            })
            .catch(error => {
                if (error.message.includes("Correo o contraseña incorrectos")) {
                    alert("❌ Correo o contraseña incorrectos. Inténtalo de nuevo.");
                } else {
                    alert("❌ " + error.message);
                }
            });
    };

    return (
        <div className="form-container">
            <div className="form-group">
                <h1>Gestión de reservas y laboratorios</h1>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            backgroundColor: "#242424",
                            color: "rgba(255, 255, 255, 0.87)",
                            border: "1px solid #013220",
                            borderRadius: "8px",
                            padding: "0.6em 1.2em",
                            width: "100%",
                            maxWidth: "400px"
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            backgroundColor: "#242424",
                            color: "rgba(255, 255, 255, 0.87)",
                            border: "1px solid #013220",
                            borderRadius: "8px",
                            padding: "0.6em 1.2em",
                            width: "100%",
                            maxWidth: "400px"
                        }}
                    />
                </div>
                <button
                    className="select-button"
                    onClick={handleLogin}
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        maxWidth: "400px"
                    }}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
};

export default Especialidades;