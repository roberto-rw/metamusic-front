const template = document.createElement('template')
const html = await (await fetch('../assets/profile-view.html')).text()
template.innerHTML = html

export class ProfileView extends HTMLElement{
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        
    }
}

customElements.define('profile-view', ProfileView)