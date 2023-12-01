import { ENDPOINTS } from "../config/endpoints";

// Admin requests
export async function login(username, password) {
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }
    let response = await fetch(ENDPOINTS.ADMIN_URL + "login", options)
    let json = await response.json()
    if (json.success) {
        sessionStorage.setItem('username', json.username);
        sessionStorage.setItem('email', json.email)
        sessionStorage.setItem('id', json.id)
    }
    return json
}

export async function logout() {
    const options = {
        method: "POST",
        credentials: 'include'
    }
    let response = await fetch(ENDPOINTS.ADMIN_URL + "logout", options)
    let json = await response.json()
    return json
}

export async function register(username, password, email) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    }
    let response = await fetch(ENDPOINTS.ADMIN_URL, options)
    let json = await response.json()
    return json
}

export async function saveSong(songData) {
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
        },
        body: JSON.stringify(songData),
    };

    const response = await fetch(ENDPOINTS.SONG_URL, options);
    const json = await response.json();

    return json;
}