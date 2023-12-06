import page from "page"
import { getPlaylistById, getPlaylistsAdmin } from "../../service/playlistService"

const template = document.createElement('template')

const html = await (await fetch('../assets/home/home-content.html')).text()
template.innerHTML = html
export class HomeContent extends HTMLElement {
    playlistContainer
    title

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.playlistContainer = this.shadowRoot.querySelector('article.grid')
        this.title = this.shadowRoot.querySelector('#title')
    }

    async connectedCallback() {
        const title = this.getAttribute('title')
        if (title) {
            this.title.textContent = title
        }

        this.loadPlaylists()
    }

    async loadPlaylists() {
        let playlists = []

        if (this.getAttribute('title') === 'Pick up where you left off') {
            playlists = await this.getPlaylistsHistory()
        }
        else if (this.getAttribute('title') === 'For you') {
            const response = await getPlaylistsAdmin()
            console.log(response)

            if (response.success) {
                const adminPlaylist = response.playlists

                adminPlaylist.forEach(playlist => {
                    playlists.push({ img: playlist.image, name: playlist.name, id: playlist._id })
                })
            }

            /* playlists = [
                {
                    img: "https://editorial.aristeguinoticias.com/wp-content/uploads/2023/06/JK-SEVEN-29062023.jpg",
                    name: "Top hits",
                    id: "656fb1384139dc2b52fe081f"
                },
                {
                    img: "https://blob.diariodelyaqui.mx/images/2021/06/27/yecorazo-jpeg-1624831497912-focus-min0.01-min0.25-732-549.jpg",
                    name: "Travel",
                    id: "656fb1384139dc2b52fe081f"
                },
                {
                    img: "https://i.blogs.es/71281f/shingeki/1366_2000.jpeg",
                    name: "SNK",
                    id: "656fb1384139dc2b52fe081f"
                }
            ] */
        }
        playlists.forEach(playlist => {
            const playlistCard = document.createElement('playlistcard-comp')
            playlistCard.setAttribute('img', playlist.img)
            playlistCard.setAttribute('name', playlist.name)
            playlistCard.setAttribute('id', playlist.id)

            if (this.getAttribute('title') === 'Pick up where you left off') {
                playlistCard.addEventListener('click', (e) => {
                    page.redirect(`/playlist/${playlist.name}`)
                })
            }
            else if (this.getAttribute('title') === 'For you') {
                console.log('for you')

                playlistCard.addEventListener('click', (e) => {
                    page.redirect(`/recommended/${playlist.id}`)
                })
            }

            this.playlistContainer.appendChild(playlistCard)
        })

    }

    async getPlaylistsHistory() {
        let historial = []
        const pHistorial = JSON.parse(localStorage.getItem('playlist-historial'))
        let playlists = []
        if (pHistorial) {
            playlists = pHistorial.slice(0, 3)
        }

        await Promise.all(playlists.map(async playlist => {
            const data = await getPlaylistById(playlist.id)
            if (data.success) {
                historial.push({ img: data.playlist.image, name: data.playlist.name })
            }
        }))

        return historial
    }
}

customElements.define('content-comp', HomeContent); 