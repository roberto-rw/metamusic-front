const template = document.createElement('template')
const html = await (await fetch('../assets/playlist-front-page.html')).text()
template.innerHTML = html

export class PlaylistFrontPage extends HTMLElement {
    #songsContainer
    #titleElement
    #authorElement
    #imageElement
    #imagebgElement


    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#songsContainer = this.shadowRoot.querySelector('#songs-container')
        this.#titleElement = this.shadowRoot.querySelector('#title')
        this.#authorElement = this.shadowRoot.querySelector('#author')
        this.#imageElement = this.shadowRoot.querySelector('#image')
        this.#imagebgElement = this.shadowRoot.querySelector('#image-bg')
    }

    async connectedCallback() {
        this.#createSongCards()
        this.#setTitle()
        this.#setAuthor()
        this.#setImage()

    }

    #setTitle() {
        this.#titleElement.innerHTML = this.getAttribute('name')
    }

    #setAuthor() {
        this.#authorElement.innerHTML = `by ${this.getAttribute('author')}`
    }

    #setImage() {
        this.#imageElement.setAttribute('src', this.getAttribute('image'))
        this.#imagebgElement.setAttribute('style', `background-image: url(${this.getAttribute('image')})`)
    }

    #createSongCards() {
        const songs = JSON.parse(this.getAttribute('songs'))
        songs.forEach(song => {
            const songCard = this.#createSongCard(song);
            this.#songsContainer.appendChild(songCard);
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

customElements.define('playlist-front-page-comp', PlaylistFrontPage)