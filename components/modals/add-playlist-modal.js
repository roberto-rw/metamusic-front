import { createPlaylist } from "../../service/playlistService.js"
import page from "page"

const template = document.createElement('template')

const html = await (await fetch('../assets/modals/add-playlist-modal.html')).text()
template.innerHTML = html

export class AddPlaylistModal extends HTMLElement {
    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this._onCloseCallback = null

        this.onClose = () => {
            const add = this.shadowRoot.getElementById('add-playlist')
            add.style.display = 'none'
            this.setAttribute('open', 'false')

            // Si hay una función de cierre configurada, llámala
            if (typeof this._onCloseCallback === 'function') {
                this._onCloseCallback()
            }
        }
    }

    connectedCallback() {
        const nameInput = this.shadowRoot.querySelector('#name')
        const descInput = this.shadowRoot.querySelector('#desc')
        const createButton = this.shadowRoot.querySelector('#add-playlist-btn')

        createButton.addEventListener('click', async () => {
            const name = nameInput.value
            const description = descInput.value
            const username = sessionStorage.getItem('username')
            const image = 'https://i.ibb.co/W6nStSF/ddf740b5-fd3a-4cfc-b13f-81e36225066f.jpg'

            try {
                const data = await createPlaylist(name, description, image, username);

                if (data.success) {
                    this.onClose()
                    page.redirect('/playlist')
                } else {
                    alert(data.message)
                }
            } catch (error) {
                console.error(error)
            }
        })

        this.btnCloseAlerta = this.shadowRoot.getElementById('btn-close-add-playlist')
        this.btnCloseAlerta.addEventListener('click', this.onClose)
    }

    setOnCloseCallback(callback) {
        // Permite configurar la función de cierre desde fuera de la clase
        this._onCloseCallback = callback
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            const add = this.shadowRoot.getElementById('add-playlist')
            if (add) {
                add.style.display = 'flex'
            }
        }

        const nameInput = this.shadowRoot.querySelector('#name')
        const descInput = this.shadowRoot.querySelector('#desc')
        nameInput.value = ''
        descInput.value = ''
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('add-playlist-modal', AddPlaylistModal)