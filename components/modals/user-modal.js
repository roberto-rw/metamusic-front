import { logoutController } from "../../controllers/userController.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/modals/user-modal.html')).text()
template.innerHTML = html

export class UserModal extends HTMLElement {
    #userMenu
    #isOpen
    #boundHandleClose

    #LogoutLink

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#isOpen = false
        this.#boundHandleClose = this.handleClose.bind(this)
        this.#userMenu = this.shadowRoot.getElementById('user-modal')
        this.#LogoutLink = this.shadowRoot.querySelector('#logout')
    }

    connectedCallback() {
        this.#LogoutLink.addEventListener('click', this.handleLogout.bind(this))
    }

    async handleLogout() {
        logoutController()
        localStorage.removeItem('playlist-historial')
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true
        }))

    }

    toggleUserMenu() {
        this.#userMenu.classList.toggle('hidden')
        if (this.#isOpen) {
            this.#isOpen = false
            document.removeEventListener('click', this.#boundHandleClose)
        } else {
            this.#isOpen = true
            setTimeout(() => {
                document.addEventListener('click', this.#boundHandleClose)
            }, 0)

        }
    }

    handleClose() {
        if (this.#isOpen) {
            this.#userMenu.classList.add('hidden')
            document.removeEventListener('click', this.#boundHandleClose)
            this.#isOpen = false
        }
    }
}

customElements.define('user-modal', UserModal)