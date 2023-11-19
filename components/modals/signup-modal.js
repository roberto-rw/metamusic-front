import { register } from "../../service/userService.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/modals/signup-modal.html')).text()
template.innerHTML = html

export class SignupModal extends HTMLElement {
    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this._onCloseCallback = null

        this.onClose = () => {
            const alerta = this.shadowRoot.getElementById('signup')
            alerta.style.display = 'none'
            this.setAttribute('open', 'false')

            // Si hay una función de cierre configurada, llámala
            if (typeof this._onCloseCallback === 'function') {
                this._onCloseCallback()
            }
        }
    }

    connectedCallback() {
        const usernameInput = this.shadowRoot.querySelector('#username')
        const passwordInput = this.shadowRoot.querySelector('#password')
        const confirmPasswordInput = this.shadowRoot.querySelector('#password2')
        const emailInput = this.shadowRoot.querySelector('#email')
        const loginButton = this.shadowRoot.querySelector('#register')


        loginButton.addEventListener('click', async () => {
            const username = usernameInput.value
            const password = passwordInput.value
            const confirmPassword = confirmPasswordInput.value
            const email = emailInput.value

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden')
                return
            }

            try {
                const data = await register(username, password, email);

                if (data.success) {
                    // Si el registro fue exitoso, redirige a la ruta "/login"
                    this.onClose()
                } else {
                    // Si hubo un error, muestra el mensaje de error
                    alert(data.message)
                }
            } catch (error) {
                // Si hubo un error en la solicitud de registro, muestra el error
                console.error(error);
            }
        })


        this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-signup')
        this.btnCloseAlerta.addEventListener('click', this.onClose)
    }

    setOnCloseCallback(callback) {
        // Permite configurar la función de cierre desde fuera de la clase
        this._onCloseCallback = callback
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            const signup = this.shadowRoot.getElementById('signup')
            if (signup) {
                signup.style.display = 'flex'
            }
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