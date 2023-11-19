import { ENDPOINTS } from "../config/endpoints";

export async function getSongsByName(name) {
    const options = {
        method: "GET",
        credentials: 'include',
        headers: {
        },
    }
    let response = await fetch((ENDPOINTS.SONG_URL + "search/byname/" + name), options)
    let json = await response.json()

    // Comprueba si json es un array. Si no lo es, devuelve un array vacío
    return Array.isArray(json) ? json : [];
}