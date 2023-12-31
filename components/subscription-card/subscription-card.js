import { subscribe } from "../../service/userService"

const template = document.createElement('template')
const html = await (await fetch('../assets/subscription-card.html')).text()
template.innerHTML = html

export class SubscriptionCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#type').textContent = this.getAttribute('type');
        this.shadowRoot.querySelector('#cost').textContent = `$ ${this.getAttribute('cost')}`;
        this.shadowRoot.querySelector('#duration').textContent = `${this.getAttribute('duration')} days`;

        this.shadowRoot.querySelector('#subscribe-button').addEventListener('click', () => this.#toSubscribe())
    }

    async #toSubscribe() {
        const subscriptionData = {
            idsubscription: this.getAttribute('id')
        }

        let response = await subscribe(subscriptionData)

        const toast = document.querySelector('toast-component')
        console.log(response)
        if (response.success) {
            toast.showToast(response.message, 'success')
        } else {
            toast.showToast(response.message, 'error')
        }

    }
}

customElements.define('subscription-card', SubscriptionCard)