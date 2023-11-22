import page from "page"

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
            let historial = JSON.parse(localStorage.getItem('playlist-historial')) || []
            playlists = historial.slice(0, 3)
        }
        else {
            playlists = [
                {
                    img: "https://editorial.aristeguinoticias.com/wp-content/uploads/2023/06/JK-SEVEN-29062023.jpg",
                    name: "Top hits"
                },
                {
                    img: "https://blob.diariodelyaqui.mx/images/2021/06/27/yecorazo-jpeg-1624831497912-focus-min0.01-min0.25-732-549.jpg",
                    name: "Travel"
                },
                {
                    img: "https://i.blogs.es/71281f/shingeki/1366_2000.jpeg",
                    name: "SNK"
                }
            ]
        }

        playlists.forEach(playlist => {
            const playlistCard = document.createElement('playlistcard-comp')
            playlistCard.setAttribute('img', playlist.img)
            playlistCard.setAttribute('name', playlist.name)

            playlistCard.addEventListener('click', (e) => {
                page.redirect(`/playlist/${playlist.name}`)
            })

            this.playlistContainer.appendChild(playlistCard)
        })

    }
}

customElements.define('content-comp', HomeContent); 