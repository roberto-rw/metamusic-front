const template = document.createElement('template')
const html = await (await fetch('../assets/modals/user-modal.html')).text()
template.innerHTML = html

export class UserModal extends HTMLElement {
    #userMenu

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#userMenu = this.shadowRoot.getElementById('user-modal')
    }

    connectedCallback() {}

    toggleUserMenu() {
        this.#userMenu.classList.toggle('hidden')
        console.log('toggleUserMenu')
    }
}

customElements.define('user-modal', UserModal)