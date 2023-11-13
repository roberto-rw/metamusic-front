class MusicApi {
    #urlService = "https://deezerdevs-deezer.p.rapidapi.com/"
    #urlSong = this.#urlService + 'track/'

    async getSong(id) {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_DEEZER_KEY,
                "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
        }
        let response = await fetch((this.#urlSong + id), options)
        let json = await response.json()
        return json
    }
}

export { MusicApi }
