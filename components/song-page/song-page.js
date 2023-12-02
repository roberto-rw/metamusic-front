const template = document.createElement('template')

const html = await (await fetch('../assets/song-page.html')).text()
template.innerHTML = html

export class SongPage extends HTMLElement{
    #songPage
    #songName
    #songSingers
    #bgImage
    constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback(){
        this.#songPage = this.shadowRoot.getElementById('song-page')
        this.#songName = this.shadowRoot.getElementById('song-name')
        this.#songSingers = this.shadowRoot.getElementById('song-singers')

        document.addEventListener('fullScreenSong', (event) => {
            this.#songName.textContent = event.detail.name
            this.#songSingers.textContent = event.detail.singers
            this.#songPage.style.backgroundImage = `url('${event.detail.image}')`
            this.open()
        })

        document.addEventListener('exitFullScreenSong', () => {
            this.close()
        })

        document.addEventListener('changeSong', (event) => {
            this.#songName.textContent = event.detail.name
            this.#songSingers.textContent = event.detail.singers
            this.#songPage.style.backgroundImage = `url('${event.detail.image}')`
        })  
    }

    open(){
        this.#songPage.classList.remove('hidden')
        document.body.style.overflow = 'hidden'
        window.scrollTo(0, 0)
    }

    close(){
        this.#songPage.classList.add('hidden')
        document.body.style.overflow = 'auto'
    }
}

customElements.define('song-page-comp', SongPage)