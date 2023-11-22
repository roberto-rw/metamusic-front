const template = document.createElement('template')
const html = await (await fetch('../assets/modals/user-modal.html')).text()
template.innerHTML = html

export class UserModal extends HTMLElement {
    #user
    #btnClose
    _onCloseCallback = null

    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#user = this.shadowRoot.getElementById('user')
        this.#btnClose = this.shadowRoot.getElementById('btn-close-user')
    }

    connectedCallback() {
        this.#btnClose.addEventListener('click', this.onClose)
    }

    onClose = () => {
        this.#user.style.display = 'none'
        this.setAttribute('open', 'false')

        if (typeof this._onCloseCallback === 'function') {
            this._onCloseCallback()
        }
    }

    setOnCloseCallback(callback) {
        this._onCloseCallback = callback
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            this.#user.style.display = 'flex'
        }
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('user-modal', UserModal)