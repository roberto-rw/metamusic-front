class MetaMusicApi {
    #urlService = "http://localhost:3000/"
    #urlUser = this.#urlService + 'user/'
    #urlSong = this.#urlService + 'song/'
    #urlPlaylist = this.#urlService + 'playlist/'

    // User requests
    async login(username, password) {
        const options = {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }
        let response = await fetch(this.#urlUser + "login", options)
        let json = await response.json()
        if (json.success) {
            sessionStorage.setItem('username', username);
        }
        return json
    }

    async #isAuth() {
        const options = {
            method: "GET",
            credentials: 'include'
        }
        let response = await fetch(this.#urlUser + "is-authenticated", options)
        let json = await response.json()
        if (json.isAuthenticated && !sessionStorage.getItem('username')) {
            sessionStorage.setItem('username', json.username);
        }
        return json
    }

    async isAuthenticated() {
        try {
            return await this.#isAuth().then((data) => {
                console.log('auth: ' + data.isAuthenticated);
                return data.isAuthenticated;
            })
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    async getPlaylistUsername(username) {
        const options = {
            method: "GET",
            headers: {
            },
        }
        let response = await fetch((this.#urlPlaylist + "search/byuser/" + username), options)
        let json = await response.json()
        return json
    }
}

export const api = new MetaMusicApi()