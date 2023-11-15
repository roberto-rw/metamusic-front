import { api } from "../../service/metamusic-api.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/login.html')).text()
template.innerHTML = html

export class Login extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const usernameInput = this.shadowRoot.querySelector('#username')
        const passwordInput = this.shadowRoot.querySelector('#password')
        const loginButton = this.shadowRoot.querySelector('#login')
        const registerLink = this.shadowRoot.querySelector('#register-link')

        loginButton.addEventListener('click', async () => {
            const username = usernameInput.value
            const password = passwordInput.value

            try {
                const data = await api.login(username, password);

                if (data.success) {
                    // Si el inicio de sesión fue exitoso, redirige a la ruta "/"
                    window.location.href = "/";
                } else {
                    // Si hubo un error, muestra el mensaje de error
                    console.error("Error en el inicio de sesión");
                }
            } catch (error) {
                // Si hubo un error en la solicitud de inicio de sesión, muestra el error
                console.error(error);
            }

        })

        registerLink.addEventListener('click', () => {
            const signupModal = document.querySelector('signup-modal')
            if (signupModal) {
                signupModal.open = 'true';
            }
        })
    }

}

customElements.define('login-comp', Login)