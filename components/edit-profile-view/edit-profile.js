const template = document.createElement('template')
const html = await (await fetch('../assets/edit-profile.html')).text()
template.innerHTML = html

export class EditProfile extends HTMLElement{
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const username = this.shadowRoot.querySelector('#username');
        const email = this.shadowRoot.querySelector('#email');
        username.textContent = sessionStorage.getItem('username');
        email.textContent = sessionStorage.getItem('email');
    }
}

customElements.define('edit-profile', EditProfile)