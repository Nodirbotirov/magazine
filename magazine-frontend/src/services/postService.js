const BASE_URL = "http://localhost:4343/api/posts";

export async function getAllPosts() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error("Postlarni olishda xatolik yuz berdi");
    }
    return response.json();
}

export async function createPost(postData) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postData),
    });
    if (!response.ok) {
        throw new Error("Post yaratishda xatolik yuz berdi");
    }
    return response.json();
}

export async function deletePost(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Post yaratishda xatolik yuz berdi");
    }
}