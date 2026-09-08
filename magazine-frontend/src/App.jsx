import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import LoginForm from "./components/LoginForm";
import { isLoggedIn, logout } from "./services/authService";

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    function handlePostCreated() {
        setRefreshKey((prev) => prev + 1);
    }

    function handleLoginSuccess() {
        setLoggedIn(true);
    }

    function handleLogout() {
        logout();
        setLoggedIn(false);
    }

    return (
        <div>
            <h1>Maydon jurnali</h1>

            {loggedIn ? (
                <div>
                    <button onClick={handleLogout}>Chiqish</button>
                    <PostForm onPostCreated={handlePostCreated} />
                </div>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}

            <PostList key={refreshKey} isAdmin={loggedIn} />
        </div>
    );
}

export default App;