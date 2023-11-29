import { ENDPOINTS } from "../config/endpoints"

export async function getPlaylistByUsername(username) {
    const options = {
        method: "GET",
        credentials: 'include',
        headers: {
        },
    }
    let response = await fetch((ENDPOINTS.PLAYLIST_URL + "search/byuser/" + username), options)
    let json = await response.json()
    return json
}

export async function getPlaylistByName(name) {
    const options = {
        method: "GET",
        credentials: 'include',
        headers: {
        },
    }
    let response = await fetch((ENDPOINTS.PLAYLIST_URL + "search/byname/" + name), options)
    let json = await response.json()
    return json[0]
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

export async function updatePlaylist(idplaylist, name, description, image, username) {
    const options = {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, image, user: { username } })
    }
    let response = await fetch((ENDPOINTS.PLAYLIST_URL + idplaylist), options)
    let json = await response.json()
    return json

}

export async function deletePlaylist(idplaylist) {
    const options = {
        method: "DELETE",
        credentials: 'include',
        headers: {
        },
    }
    let response = await fetch((ENDPOINTS.PLAYLIST_URL + idplaylist), options)
    let json = await response.json()
    return json
}

export async function addSongToPlaylist(idplaylist, idsong) {
    const options = {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idsong })
    }
    let response = await fetch(`${ENDPOINTS.PLAYLIST_URL}/update/addsong/${idplaylist}`, options)
    let json = await response.json()
    return json
}

export async function removeSongFromPlaylist(idplaylist, idsong) {
    const options = {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idsong })
    }
    let response = await fetch(`${ENDPOINTS.PLAYLIST_URL}/update/removesong/${idplaylist}`, options)
    let json = await response.json()
    return json
}