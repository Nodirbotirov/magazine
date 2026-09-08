import { useState, useEffect } from "react";
import { getAllPosts, deletePost } from "../services/postService";

function PostList({isAdmin}) {
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

    async function handleDelete(id) {
        try {
            await deletePost(id);
            setPosts(posts.filter((p) => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <p>Yuklanmoqda...</p>;
    if (error) return <p>Xatolik: {error}</p>;

    return (
        <div>
            <h2>Postlar</h2>
            {posts.length === 0 && <p>Hozircha postlar yo'q.</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: "20px" }}>
                        <strong>{post.title}</strong> — {post.category}
                        <p>{post.content}</p>
                        {post.author && <p>Muallif: {post.author}</p>}

                        {post.imageUrl && (
                            <div>
                                <img src={`http://localhost:4343${post.imageUrl}`} alt={post.title} width="200" />
                            </div>
                        )}
                        {post.videoUrl && (
                            <div>
                                <video src={`http://localhost:4343${post.videoUrl}`} controls width="300" />
                            </div>
                        )}

                        {isAdmin && (
                            <button onClick={() => handleDelete(post.id)}>O'chirish</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;