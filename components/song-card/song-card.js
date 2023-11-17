const template = document.createElement('template')

const html = await (await fetch('../assets/song-card.html')).text()
template.innerHTML = html

export class SongCard extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'artist', 'duration'];
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.getElementById(name).textContent = newValue;
    }

    async connectCallback() {

    }
}

customElements.define('songcard-comp', SongCard)