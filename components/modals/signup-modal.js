import { register } from "../../service/userService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/modals/signup-modal.html')).text()
template.innerHTML = html

export class SignupModal extends HTMLElement {
    #signup
    #btnClose
    #usernameInput
    #passwordInput
    #confirmPasswordInput
    #emailInput
    #registerButton
    _onCloseCallback = null

    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#signup = this.shadowRoot.getElementById('signup')
        this.#btnClose = this.shadowRoot.getElementById('btn-close-signup')
        this.#usernameInput = this.shadowRoot.querySelector('#username')
        this.#passwordInput = this.shadowRoot.querySelector('#password')
        this.#confirmPasswordInput = this.shadowRoot.querySelector('#password2')
        this.#emailInput = this.shadowRoot.querySelector('#email')
        this.#registerButton = this.shadowRoot.querySelector('#register')
    }

    connectedCallback() {
        this.#registerButton.addEventListener('click', this.#handleRegister)
        this.#btnClose.addEventListener('click', this.onClose)
    }

    #handleRegister = async () => {
        const username = this.#usernameInput.value
        const password = this.#passwordInput.value
        const confirmPassword = this.#confirmPasswordInput.value
        const email = this.#emailInput.value

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            return
        }

        try {
            const data = await register(username, password, email);

            if (data.success) {
                this.onClose()
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    onClose = () => {
        this.#signup.style.display = 'none'
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
            this.#signup.style.display = 'flex'
        }
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('signup-modal', SignupModal)