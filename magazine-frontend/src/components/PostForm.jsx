import { useState } from "react";
import { createPost, uploadFile } from "../services/postService";

function PostForm({ onPostCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        category: "Futbol",
    });
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            let imageUrl = "";
            let videoUrl = "";

            if (imageFile) {
                const imgResult = await uploadFile(imageFile);
                imageUrl = imgResult.url;
            }
            if (videoFile) {
                const vidResult = await uploadFile(videoFile);
                videoUrl = vidResult.url;
            }

            const newPost = await createPost({ ...formData, imageUrl, videoUrl });
            onPostCreated(newPost);

            setFormData({ title: "", content: "", author: "", category: "Futbol" });
            setImageFile(null);
            setVideoFile(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Yangi post qo'shish</h2>

            <input name="title" placeholder="Sarlavha" value={formData.title} onChange={handleChange} required />
            <textarea name="content" placeholder="Matn" value={formData.content} onChange={handleChange} required />
            <input name="author" placeholder="Muallif" value={formData.author} onChange={handleChange} />

            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Futbol">Futbol</option>
                <option value="Boks">Boks</option>
                <option value="Tennis">Tennis</option>
                <option value="Boshqa">Boshqa</option>
            </select>

            <div>
                <label>Rasm: </label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </div>

            <div>
                <label>Video: </label>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? "Yuklanmoqda..." : "Qo'shish"}
            </button>
        </form>
    );
}

export default PostForm;