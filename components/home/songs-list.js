import { getSongs } from "../../service/songService.js";

const template = document.createElement('template')

const html = await (await fetch('../assets/home/songs-list.html')).text()
template.innerHTML = html

export class SongList extends HTMLElement {
    #songsContainer

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#songsContainer = this.shadowRoot.getElementById('songs-container')
    }

    async connectedCallback() {
        this.loadSongs()
    }

    async loadSongs() {
        const songs = await getSongs()
        songs.forEach(song => {
            const songCard = this.#createSongCard(song);
            this.#songsContainer.appendChild(songCard);
        });
    }

    #createSongCard(song) {
        const songCard = document.createElement('songcard-comp')
        songCard.setAttribute('img', song.image)
        songCard.setAttribute('name', song.name)
        songCard.setAttribute('duration', song.duration)
        songCard.setAttribute('artist', song.singers)
        songCard.setAttribute('idsong', song.idsong)
        return songCard
    }

}

customElements.define('songlist-comp', SongList); 