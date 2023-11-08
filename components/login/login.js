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

    }

}

customElements.define('login-comp', Login)