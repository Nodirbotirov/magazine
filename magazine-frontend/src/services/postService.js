import { getToken } from "./authService";

const BASE_URL = "http://localhost:4343/api/posts";
const UPLOAD_URL = "http://localhost:4343/api/upload";

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
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
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
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Post o'chirishda xatolik yuz berdi");
    }
}

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Fayl yuklashda xatolik yuz berdi");
    }
    return response.json();
}