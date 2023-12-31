import { ENDPOINTS } from "../config/endpoints";

// User requests
export async function login(username, password) {
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }
    let response = await fetch(ENDPOINTS.USER_URL + "login", options)
    let json = await response.json()
    console.log(json)

    if (json.success) {
        sessionStorage.setItem('username', json.username);
        sessionStorage.setItem('email', json.email)
        sessionStorage.setItem('id', json.id)
        if (json.image != null) {
            sessionStorage.setItem('image', json.image)
        }
        else {
            sessionStorage.setItem('image', '/user-icon.png')
        }

    }


    return json
}

export async function logout() {
    const options = {
        method: "POST",
        credentials: 'include'
    }
    let response = await fetch(ENDPOINTS.USER_URL + "logout", options)
    let json = await response.json()
    return json
}

async function isAuth() {
    const options = {
        method: "GET",
        credentials: 'include'
    }
    let response = await fetch(ENDPOINTS.USER_URL + "is-authenticated", options)
    let json = await response.json()

    if (json.isAuthenticated) {
        if (sessionStorage.getItem('username') == null) {
            console.log('setting session')
            sessionStorage.setItem('username', json.username);
            sessionStorage.setItem('email', json.email)
            sessionStorage.setItem('id', json.id)
            if (json.image != null) {
                sessionStorage.setItem('image', json.image)
            }
            else {
                sessionStorage.setItem('image', '/user-icon.png')
            }

            document.dispatchEvent(new CustomEvent('sessionDataSaved'));
        }
    }


    return json
}

export async function isAuthenticated() {
    try {
        return await isAuth().then((data) => {
            console.log('auth: ' + data.isAuthenticated)
            return data.isAuthenticated
        })
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
}

export async function register(username, password, email) {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    }
    let response = await fetch(ENDPOINTS.USER_URL, options)
    let json = await response.json()
    return json
}

export async function subscribe(subscriptionData) {
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData)
    }
    let response = await fetch(ENDPOINTS.USER_URL + "subscribe", options)
    let json = await response.json()
    return json
}

export async function editUser(userData) {
    console.log(userData);
    const options = {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    let response = await fetch(ENDPOINTS.USER_URL + sessionStorage.getItem('id'), options)
    let json = await response.json()
    return json
}