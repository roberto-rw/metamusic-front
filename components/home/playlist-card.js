export class PlaylistCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    async connectedCallback() {
        const doc = await this.loadTemplate()
        this.updateImage(doc)
        this.updateName(doc)
        this.appendStyles(doc)
        this.appendContent(doc)
    }

    async loadTemplate() {
        const response = await fetch('../assets/home/playlist-card.html')
        const text = await response.text()
        const parser = new DOMParser()
        return parser.parseFromString(text, 'text/html')
    }

    updateImage(doc) {
        const imgSrc = this.getAttribute('img')
        if (imgSrc) {
            const imgElement = doc.querySelector('#img')
            imgElement.src = imgSrc
        }
    }

    updateName(doc) {
        const name = this.getAttribute('name')
        if (name) {
            const nameElement = doc.querySelector('#name')
            nameElement.textContent = name
        }
    }

    appendStyles(doc) {
        this.shadowRoot.appendChild(doc.querySelector('link').cloneNode())
    }

    appendContent(doc) {
        this.shadowRoot.appendChild(doc.body.firstChild)
    }
}

customElements.define('playlistcard-comp', PlaylistCard)