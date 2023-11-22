import { logoutController } from "../../controllers/userController.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/sidebar.html')).text()
template.innerHTML = html

export class Sidebar extends HTMLElement {
    #logoutLink

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#logoutLink = this.shadowRoot.querySelector('#logout')
    }

    connectedCallback() {
        this.#logoutLink.addEventListener('click', this.#handleLogout.bind(this))
    }

    #handleLogout() {
        logoutController()
        localStorage.removeItem('playlist-historial')
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true
        }))
    }

}

customElements.define('sidebar-comp', Sidebar)