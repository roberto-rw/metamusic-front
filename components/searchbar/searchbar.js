const template = document.createElement('template')
import { MusicApi } from "../../service/music-api"
import { getSongsByName } from "../../service/songService"



const html = await (await fetch('../assets/searchbar.html')).text()
template.innerHTML = html

export class Searchbar extends HTMLElement {
    #searchbar
    #songMenu
    #api

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#api = new MusicApi()
        this.#searchbar = this.shadowRoot.querySelector('#searchbar')
        this.#songMenu = document.querySelector('song-menu')
    }

    connectedCallback() {
        this.#searchbar.addEventListener('keyup', () => this.#printSearchResults())
    }

    async #printSearchResults() {
        const songsContainer = document.querySelector('#songs-container')
        songsContainer.innerHTML = ''

        let response = await this.#api.searchSongs(this.#searchbar.value)
        const songs = response.data

        songs.forEach(song => {
            const songCard = this.#createSongCard(song)
            songsContainer.appendChild(songCard)
        })

    }

    #createSongCard(song) {
        const songCard = document.createElement('songcard-comp')
        songCard.setAttribute('img', song.album.cover_medium)
        songCard.setAttribute('name', song.title)
        songCard.setAttribute('duration', song.duration)
        songCard.setAttribute('artist', song.artist.name)
        songCard.setAttribute('idsong', song.id)

        // Mostrar el menú al hacer clic derecho en songCard
        songCard.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            const songDetails = {
                cardId: songCard.getAttribute('idsong'),
                cardName: songCard.getAttribute('name'),
                cardArtist: songCard.getAttribute('artist'),
                cardImage: songCard.getAttribute('img')
            }

            this.#songMenu.show(event, songDetails); // Use this.#songMenu instead of songMenu
        });

        return songCard
    }


}

customElements.define('searchbar-comp', Searchbar)