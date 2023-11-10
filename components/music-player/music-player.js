const template = document.createElement('template')

const html = await (await fetch('../assets/music-player.html')).text()
template.innerHTML = html

export class Player extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {

    }

}

customElements.define('musicplayer-comp', Player)