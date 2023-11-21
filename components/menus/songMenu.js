const template = document.createElement('template')
const html = await (await fetch('../assets/menus/songMenu.html')).text()
template.innerHTML = html

export class SongMenu extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    async connectedCallback() {
        document.addEventListener('click', (event) => {
            this.hide()
        })

        const showPlaylistElement = this.shadowRoot.querySelector('#showPlaylist')
        const liElement = showPlaylistElement.parentElement

        showPlaylistElement.addEventListener('mouseover', async () => {
            const playlists = await this.getPlaylists()
            this.showPlaylists(playlists)
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
        return ['Playlist 1', 'Playlist 2', 'Playlist 3']
    }

    showPlaylists(playlists) {
        const playlistsElement = this.shadowRoot.querySelector('#playlists')
        playlistsElement.innerHTML = playlists.map(playlist => `<h3>${playlist}</h3>`).join('')
        playlistsElement.classList.add('py-2')

        playlistsElement.querySelectorAll('h3').forEach((playlistElement, index) => {
            playlistElement.classList.add('hover:cursor-pointer', 'p-2')
            playlistElement.addEventListener('click', () => this.onPlaylistClick(index))
        })

        playlistsElement.classList.remove('hidden')
    }

    hidePlaylists() {
        const playlistsElement = this.shadowRoot.querySelector('#playlists')
        playlistsElement.classList.add('hidden')
    }

    onPlaylistClick(index) {
        console.log(`Playlist at index ${index} was clicked.`)
    }

    show(event) {
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