import { useState, useEffect } from "react";
import { getAllPosts } from "../services/postService";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    if (loading) return <p>Yuklanmoqda...</p>;
    if (error) return <p>Xatolik: {error}</p>;

    return (
        <div>
            <h2>Postlar</h2>
            {posts.length === 0 && <p>Hozircha postlar yo'q.</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong> — {post.category}
                    </li>
                ))}
            </ul>
        </div>
    );
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
        imageUrl: "",
        videoUrl: ""
    })
}



export default PostList;