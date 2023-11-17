const template = document.createElement('template')

const html = await (await fetch('../assets/playlists/playlists-cont.html')).text()
template.innerHTML = html

export class PlaylistsContent extends HTMLElement {
    #playlistContainer
    #titleElement
    #addLink

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#playlistContainer = this.shadowRoot.querySelector('article.grid')
        this.#titleElement = this.shadowRoot.querySelector('#title')
        this.#addLink = this.shadowRoot.querySelector('#add-playlist-link');
    }

    async connectedCallback() {
        this.#setTitle()
        this.#createPlaylists()

        this.#addLink.addEventListener('click', () => this.#handleAdd());
    }

    #handleAdd() {
        const addPlaylistModal = document.querySelector('add-playlist-modal');
        if (addPlaylistModal) {
            addPlaylistModal.open = 'true';
        }
    }

    #setTitle() {
        const id = this.getAttribute('title');
        if (id) {
            this.#titleElement.textContent = id
        }
    }

    #createPlaylists() {
        const testPlaylists = [
            // ...
        ];

        const playlists = JSON.parse(this.getAttribute('playlists')) || testPlaylists

        playlists.forEach(playlist => {
            const playlistCard = this.#createPlaylistCard(playlist)
            this.#playlistContainer.appendChild(playlistCard)
        });
    }

    #createPlaylistCard(playlist) {
        const playlistCard = document.createElement('playlistcard2-comp')
        playlistCard.setAttribute('img', playlist.image)
        playlistCard.setAttribute('name', playlist.name)
        playlistCard.setAttribute('id', '1955330657')

        return playlistCard
    }
}

customElements.define('playlists-comp', PlaylistsContent)