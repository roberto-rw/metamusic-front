import { logoutController } from "../../controllers/userController.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/sidebar.html')).text()
template.innerHTML = html

export class Sidebar extends HTMLElement {

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {


    }

}

customElements.define('sidebar-comp', Sidebar)