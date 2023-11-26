import { removeSongFromPlaylist } from "../../service/playlistService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/menus/removeSongMenu.html')).text()
template.innerHTML = html

export class RemoveSongMenu extends HTMLElement{
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

    show(event, songId, playlistId) {
        const removeSongMenu = this.shadowRoot.querySelector('#remove-song-menu')
        removeSongMenu.style.left = `${event.pageX}px`
        removeSongMenu.style.top = `${event.pageY + 2}px`
        removeSongMenu.classList.remove('hidden')

        this.songId = songId
        this.playlistId = playlistId

        console.log(this.songId)
        console.log(this.playlistId)
    }

    hide() {
        const removeSongMenu = this.shadowRoot.querySelector('#remove-song-menu')
        removeSongMenu.classList.add('hidden')
    }

    async removeSong(){
        const playlistUpdated = await removeSongFromPlaylist(this.playlistId, this.songId)
        const songs = playlistUpdated.songs
        // Emitir un evento personalizado después de que la canción se ha eliminado
        this.dispatchEvent(new CustomEvent('songRemoved', { bubbles: true, composed: true, detail: songs }));
    }
}

customElements.define('remove-song-menu', RemoveSongMenu)