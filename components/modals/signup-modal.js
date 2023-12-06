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

        const toast = document.querySelector('toast-component')

        if (username.length === 0 || password.length === 0 || confirmPassword.length === 0 || email.length === 0) {
            toast.showToast('Por favor, complete todos los campos', 'error')
            return
        }


        if (password !== confirmPassword) {

            toast.showToast('Las contraseñas no coinciden', 'error')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.match(emailRegex)) {
            toast.showToast('El formato del correo electrónico no es válido', 'error');
            return
        }

        try {
            const data = await register(username, password, email);

            if (data.success) {
                toast.showToast('Registro con exito', 'success')
                this.onClose()
            } else {
                toast.showToast(data.message, 'error')
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