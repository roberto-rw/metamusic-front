const template = document.createElement('template')

const html = await (await fetch('../assets/signup.html')).text()
template.innerHTML = html

export class SignUp extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

}

customElements.define('signup-comp', SignUp)