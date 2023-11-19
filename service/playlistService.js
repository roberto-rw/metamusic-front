import { ENDPOINTS } from "../config/endpoints"

export async function getPlaylistByUsername(username) {
    const options = {
        method: "GET",
        headers: {
        },
    }
    let response = await fetch((ENDPOINTS.PLAYLIST_URL + "search/byuser/" + username), options)
    let json = await response.json()
    return json
}

export async function createPlaylist(name, description, image, username) {
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, image, user: { username } })
    }
    let response = await fetch(ENDPOINTS.PLAYLIST_URL, options)
    let json = await response.json()
    return json
}