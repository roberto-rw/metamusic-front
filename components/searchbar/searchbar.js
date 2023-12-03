import { searchSongs } from "../../service/music-api.js"
const template = document.createElement('template')

const html = await (await fetch('../assets/searchbar.html')).text()
template.innerHTML = html

export class Searchbar extends HTMLElement {
    #searchbar
    #songMenu

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#searchbar = this.shadowRoot.querySelector('#searchbar')
        this.#songMenu = document.querySelector('song-menu')
    }

    connectedCallback() {
        this.#searchbar.addEventListener('keyup', () => this.#printSearchResults())
    }

    async #printSearchResults() {
        const songsContainer = document.querySelector('#songs-container')
        songsContainer.innerHTML = ''

        let response = await searchSongs(this.#searchbar.value)
        const songs = response.data

        songs.forEach(song => {
            const songCard = this.#createSongCard(song)
            songsContainer.appendChild(songCard)
        })

    }

    #createSongCard(song) {
        const songCard = document.createElement('songcard-comp')
        songCard.setAttribute('img', song.album.cover_xl)
        songCard.setAttribute('name', song.title)
        songCard.setAttribute('duration', song.duration)
        songCard.setAttribute('artist', song.artist.name)
        songCard.setAttribute('album', song.album.title)
        songCard.setAttribute('idsong', song.id)

        // Mostrar el menú al hacer clic derecho en songCard
        songCard.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            const songDetails = {
                cardId: songCard.getAttribute('idsong'),
                cardName: songCard.getAttribute('name'),
                cardAlbum: songCard.getAttribute('album'),
                cardDuration: songCard.getAttribute('duration'),
                cardArtist: songCard.getAttribute('artist'),
                cardImage: songCard.getAttribute('img')
            }

            this.#songMenu.show(event, songDetails); // Use this.#songMenu instead of songMenu
        });

        return songCard
    }


}

customElements.define('searchbar-comp', Searchbar)