const template = document.createElement('template')

const html = await (await fetch('../assets/modals/user-modal.html')).text()
template.innerHTML = html

export class UserModal extends HTMLElement {
    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this._onCloseCallback = null

        this.onClose = () => {
            const alerta = this.shadowRoot.getElementById('alerta')
            alerta.style.display = 'none'
            this.setAttribute('open', 'false')

            // Si hay una función de cierre configurada, llámala
            if (typeof this._onCloseCallback === 'function') {
                this._onCloseCallback()
            }
        }
    }

    connectedCallback() {
        this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-alerta')
        this.btnCloseAlerta.addEventListener('click', this.onClose)
    }

    setOnCloseCallback(callback) {
        // Permite configurar la función de cierre desde fuera de la clase
        this._onCloseCallback = callback
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            const alerta = this.shadowRoot.getElementById('alerta')
            alerta.style.display = 'flex'
        }
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('user-modal', UserModal)