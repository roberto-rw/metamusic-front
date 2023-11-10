const template = document.createElement('template')

const html = await (await fetch('../assets/playlist-card.html')).text()
template.innerHTML = html

export class PlaylistCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {

    }

}

customElements.define('playlistcard-comp', PlaylistCard)