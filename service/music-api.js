import { ENDPOINTS } from "../config/endpoints.js"

export async function getSong(id) {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_DEEZER_KEY,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
    }
    let response = await fetch((ENDPOINTS.MUSIC_GET_SONG + id), options)
    let json = await response.json()
    return json
}

export async function searchSongs(param) {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_DEEZER_KEY,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        }
    }

    let response = await fetch((ENDPOINTS.MUSIC_SEARCH + 'search?q=' + param), options)
    let json = await response.json()
    return json
}
