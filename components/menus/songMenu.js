import { getPlaylistByUsername, addSongToPlaylist } from "/service/playlistService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/menus/songMenu.html')).text()
template.innerHTML = html

export class SongMenu extends HTMLElement {
    playlist
    #songDetails

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    async connectedCallback() {
        this.playlists = await this.getPlaylists()
        const showPlaylistElement = this.shadowRoot.querySelector('#showPlaylist')
        const liElement = showPlaylistElement.parentElement


        document.addEventListener('click', (event) => {
            this.hide()
        })

        showPlaylistElement.addEventListener('mouseover', async () => {

            this.showPlaylists(this.playlists)
            liElement.classList.remove('flex-col')
            liElement.classList.add('flex-row')
        })

        liElement.addEventListener('mouseout', () => {
            setTimeout(() => {
                if (!liElement.matches(':hover')) {
                    this.hidePlaylists()
                    liElement.classList.remove('flex-row')
                    liElement.classList.add('flex-col')
                }
            }, 500)
        })
    }

    async getPlaylists() {
        return await getPlaylistByUsername(sessionStorage.getItem('username'))
    }

    showPlaylists(playlists) {
        const playlistsElement = this.shadowRoot.querySelector('#playlists')

        // Clear playlistsElement
        while (playlistsElement.firstChild) {
            playlistsElement.removeChild(playlistsElement.firstChild);
        }

        playlists.forEach((playlist, index) => {
            const div = document.createElement('div');
            div.className = 'p-2 cursor-pointer bg-gray-500';
            div.dataset.index = index;
            div.textContent = playlist.name;

            div.addEventListener('click', () => this.onPlaylistClick(playlist._id));

            playlistsElement.appendChild(div);
        });
        playlistsElement.classList.remove('hidden')
    }

    hidePlaylists() {
        const playlistsElement = this.shadowRoot.querySelector('#playlists')
        playlistsElement.classList.add('hidden')
    }

    async onPlaylistClick(id) {
        const result = await addSongToPlaylist(id, this.#songDetails.cardId)

        if (result.success) {
            console.log(`Song with id ${this.#songDetails.cardId} was added to playlist with id ${id}.`)
        } else {
            console.log(`Song with id ${this.#songDetails.cardId} was not added to playlist with id ${id}.`)
        }
    }

    show(event, songDetails) {
        if (this.#songDetails !== songDetails) {
            this.#songDetails = songDetails

            console.log(`SongMenu: ${songDetails.cardName} was clicked.`)
        }

        const posElement = this.shadowRoot.querySelector('.pos')
        if (posElement) {
            posElement.classList.remove('hidden')
            posElement.style.left = `${event.pageX}px`
            posElement.style.top = `${event.pageY + 2}px`
        }
    }

    hide() {
        const posElement = this.shadowRoot.querySelector('.pos')
        if (posElement) {
            posElement.classList.remove('block')
            posElement.classList.add('hidden')
        }
    }
}

customElements.define('song-menu', SongMenu)