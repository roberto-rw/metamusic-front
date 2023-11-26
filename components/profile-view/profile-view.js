import { getSongs } from "../../service/songService"

const template = document.createElement('template')
const html = await (await fetch('../assets/profile-view.html')).text()
template.innerHTML = html

export class ProfileView extends HTMLElement{
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const username = this.shadowRoot.querySelector('#username');
        const email = this.shadowRoot.querySelector('#email');
        username.textContent = sessionStorage.getItem('username');
        email.textContent = sessionStorage.getItem('email');
        this.#loadSongs();
    }

    async #loadSongs() {
        const likedSongs = this.shadowRoot.querySelector('#liked-songs');
        const songs = await getSongs()
        songs.forEach(song => {
            const songCard = this.#createSongCard(song);
            likedSongs.appendChild(songCard);
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

customElements.define('profile-view', ProfileView)