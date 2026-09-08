import { useState } from "react";
import { login } from "../services/authService";

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await login(username, password);
            onLoginSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "0 auto" }}>
            <h2>Admin kirish</h2>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={submitting}>
                {submitting ? "Kirilmoqda..." : "Kirish"}
            </button>
        </form>
    );
}

export default LoginForm;