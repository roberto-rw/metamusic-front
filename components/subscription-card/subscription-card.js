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
        
    }
}   

customElements.define('subscription-card', SubscriptionCard)