const template = document.createElement('template')

const html = await (await fetch('../assets/header.html')).text()
template.innerHTML = html

export class Header extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const userIcon = this.shadowRoot.querySelector('img');
        const userSalute = this.shadowRoot.querySelector('#user-salute');

        userSalute.textContent = "Good morning, " + sessionStorage.getItem('username') + "!";

        userIcon.addEventListener('click', () => {
            const userModal = document.querySelector('user-modal');
            if (userModal) {
                userModal.open = 'true';
            }
        });
    }


}

customElements.define('header-comp', Header)