const template = document.createElement('template')

const html = await (await fetch('../assets/header.html')).text()
template.innerHTML = html

export class Header extends HTMLElement {
    #userIcon
    #userSalute
    #userModal

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#userIcon = this.shadowRoot.querySelector('#user-icon')
        this.#userSalute = this.shadowRoot.querySelector('#user-salute')
        this.#userModal = this.shadowRoot.querySelector('#user-modal')
    }

    connectedCallback() {
        this.setText()

        document.addEventListener('sessionDataSaved', async (event) => {
            this.setText()
        })

        document.addEventListener('userEdited', async (event) => {
            this.setText()
        })

        this.#userIcon.addEventListener('click', () => {
            this.#userModal.toggleUserMenu()
        })


    }

    setText() {
        this.#userSalute.textContent = "Good morning, " + sessionStorage.getItem('username') + "!"
        this.#userIcon.setAttribute('src', sessionStorage.getItem('image'))
    }


}

customElements.define('header-comp', Header)