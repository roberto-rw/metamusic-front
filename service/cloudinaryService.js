import { ENDPOINTS } from "../config/endpoints"

export async function uploadImage(file, username) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'sag3ztwp')
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
    formData.append('timestamp', (Date.now() / 1000) | 0)
    formData.append('folder', `playlist/${username}`)

    const response = await fetch(ENDPOINTS.CLOUDINARY_URL, {
        method: 'POST',
        body: formData
    })

    const data = await response.json()
    return data.secure_url
}
