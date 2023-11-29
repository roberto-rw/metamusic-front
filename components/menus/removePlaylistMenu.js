import page from "page"
import { deletePlaylist } from "../../service/playlistService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/menus/removePlaylistMenu.html')).text()
template.innerHTML = html

export class RemovePlaylistMenu extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.songId
        this.playlistId
    }

    connectedCallback() {
        document.addEventListener('click', (event) => {
            this.hide()
        })

        this.addEventListener('click', (event) => {
            event.stopPropagation()
            this.removeSong()
            this.hide()
        })
    }

    show(event, id) {
        const removeSongMenu = this.shadowRoot.querySelector('#remove-playlist-menu')
        removeSongMenu.style.left = `${event.pageX}px`
        removeSongMenu.style.top = `${event.pageY + 2}px`
        removeSongMenu.classList.remove('hidden')

        this.playlistId = id
    }

    hide() {
        const removeSongMenu = this.shadowRoot.querySelector('#remove-playlist-menu')
        removeSongMenu.classList.add('hidden')
    }

    async removeSong() {
        try {
            await deletePlaylist(this.playlistId)
            page.redirect('/playlist')
        } catch (error) {
            console.log(error)
        }
    }
}

customElements.define('remove-playlist-menu', RemovePlaylistMenu)