import { getPlaylistSongs } from "../../service/userService"

const template = document.createElement('template')
const html = await (await fetch('../assets/playlist-front-page.html')).text()
template.innerHTML = html

export class PlaylistFrontPage extends HTMLElement {
    #songsContainer;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
        this.#songsContainer = this.shadowRoot.querySelector('#songs-container');
    }

    async connectedCallback() {
        const songs = await getPlaylistSongs();
        this.#createSongCards(songs);
    }

    #createSongCards(songs) {
        songs.forEach(song => {
            const songCard = this.#createSongCard(song);
            this.#songsContainer.appendChild(songCard);
        });
    }

    #createSongCard(song) {
        const songCard = document.createElement('songcard-comp');
        songCard.setAttribute('name', song.name);
        songCard.setAttribute('artist', song.singers);
        songCard.setAttribute('duration', song.duration);
        songCard.setAttribute('id', song.idsong);

        const card = songCard.shadowRoot.querySelector('#card');
        card.addEventListener('click', () => this.#handleCardClick(song.idsong));

        return songCard;
    }

    #handleCardClick(songId) {
        console.log('card clicked');
        this.dispatchEvent(new CustomEvent('cardSelected', {
            detail: {
                cardId: songId
            },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('playlist-front-page-comp', PlaylistFrontPage)