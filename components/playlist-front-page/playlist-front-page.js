const template = document.createElement('template')

const html = await (await fetch('../assets/playlist-front-page.html')).text()
template.innerHTML = html

export class PlayListFrontPage extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback(){

    }
}

customElements.define('playlist-front-page-comp', PlayListFrontPage)