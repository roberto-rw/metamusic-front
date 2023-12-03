import { ENDPOINTS } from "../config/endpoints"

export async function uploadImagePlaylist(file, userId) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'sag3ztwp')
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
    formData.append('timestamp', (Date.now() / 1000) | 0)
    formData.append('folder', `playlist/${userId}`)

    const response = await fetch(ENDPOINTS.CLOUDINARY_URL, {
        method: 'POST',
        body: formData
    })

    const data = await response.json()
    return data.secure_url
}

export async function uploadImageProfile(file, userId) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'sag3ztwp')
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
    formData.append('timestamp', (Date.now() / 1000) | 0)
    formData.append('folder', `profile/${userId}`)

    const response = await fetch(ENDPOINTS.CLOUDINARY_URL, {
        method: 'POST',
        body: formData
    })

    const data = await response.json()
    return data.secure_url
}