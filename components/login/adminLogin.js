import { login } from "../../service/adminService.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/login.html')).text()
template.innerHTML = html

export class adminLogin extends HTMLElement {
    #usernameInput
    #passwordInput
    #loginButton
    #registerLink

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#usernameInput = this.shadowRoot.querySelector('#username')
        this.#passwordInput = this.shadowRoot.querySelector('#password')
        this.#loginButton = this.shadowRoot.querySelector('#login')
        this.#registerLink = this.shadowRoot.querySelector('#register-link')
    }

    connectedCallback() {
        this.#loginButton.addEventListener('click', () => this.#handleLogin());
        this.#registerLink.addEventListener('click', () => this.#handleRegister());
    }

    async #handleLogin() {
        const username = this.#usernameInput.value;
        const password = this.#passwordInput.value;
      
        try {
          const data = await login(username, password)
      
          if (data.success) {
            window.location.href = "/addSongAdmin";
          } else {
            alert('Las credenciales son incorrectas');
          }
        } catch (error) {
          console.error(error);
        }
      }      

    #handleRegister() {
        const signupModal = document.querySelector('signup-modal');
        if (signupModal) {
            signupModal.open = 'true';
        }
    }
}

customElements.define('adminlogin-comp', adminLogin);