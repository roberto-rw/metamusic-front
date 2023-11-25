import { getSubscriptions } from "../../service/subcriptionService"

const template = document.createElement('template')
const html = await (await fetch('../assets/subscription-container.html')).text()
template.innerHTML = html

export class SubscriptionContainer extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        console.log("subscription-container added")
        this.#printSubscriptions()
    }

    async #printSubscriptions() {
        const subscriptionsContainer = document.querySelector('#subscriptions-container')
        subscriptionsContainer.innerHTML = ''
        let subscriptions = await getSubscriptions()
        console.log(subscriptions)
        subscriptions.forEach(subscription => {
            const subscriptionCard = this.#createSubscriptionCard(subscription)
            subscriptionsContainer.appendChild(subscriptionCard)
            console.log(subscriptionCard)
            console.log("subscriptionCard added")
        })
    }

    #createSubscriptionCard(subscription) {
        const subscriptionCard = document.createElement('subscription-card')
        subscriptionCard.setAttribute('id', subscription._id)
        subscriptionCard.setAttribute('type', subscription.type)
        subscriptionCard.setAttribute('cost', subscription.cost)
        subscriptionCard.setAttribute('duration', subscription.duration)
        return subscriptionCard
    }
}   

customElements.define('subscription-container', SubscriptionContainer)