const AUTH_URL = "http://localhost:4343/api/auth/login";

export async function login(username, password) {
    const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error("Login yoki parol noto'g'ri");
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token;
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isLoggedIn() {
    return !!getToken();
}