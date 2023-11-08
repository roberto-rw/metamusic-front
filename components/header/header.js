const template = document.createElement('template')

const html = await (await fetch('../assets/header.html')).text()
template.innerHTML = html

export class Header extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {

    }

}

customElements.define('header-comp', Header)