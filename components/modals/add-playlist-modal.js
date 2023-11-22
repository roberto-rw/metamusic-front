import page from "page"
import { createPlaylist } from "../../service/playlistService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/modals/add-playlist-modal.html')).text()
template.innerHTML = html

export class AddPlaylistModal extends HTMLElement {
    #addPlaylist
    #btnClose
    #nameInput
    #descInput
    #createButton
    _onCloseCallback = null

    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#addPlaylist = this.shadowRoot.getElementById('add-playlist')
        this.#btnClose = this.shadowRoot.getElementById('btn-close-add-playlist')
        this.#nameInput = this.shadowRoot.querySelector('#name')
        this.#descInput = this.shadowRoot.querySelector('#desc')
        this.#createButton = this.shadowRoot.querySelector('#add-playlist-btn')
    }

    connectedCallback() {
        this.#createButton.addEventListener('click', this.#handleCreate)
        this.#btnClose.addEventListener('click', this.onClose)
    }

    #handleCreate = async () => {
        const name = this.#nameInput.value
        const description = this.#descInput.value
        const username = sessionStorage.getItem('username')
        const image = 'https://i.ibb.co/W6nStSF/ddf740b5-fd3a-4cfc-b13f-81e36225066f.jpg'

        try {
            const data = await createPlaylist(name, description, image, username);

            if (data.success) {
                this.dispatchEvent(new CustomEvent('playlistCreated', {
                    detail: {
                        playlist: data.playlist
                    },
                    bubbles: true,
                    composed: true
                }))


                this.onClose()
                page.redirect('/playlist')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    onClose = () => {
        this.#addPlaylist.style.display = 'none'
        this.setAttribute('open', 'false')

        if (typeof this._onCloseCallback === 'function') {
            this._onCloseCallback()
        }
    }

    setOnCloseCallback(callback) {
        this._onCloseCallback = callback
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open' && newValue === 'true') {
            this.#addPlaylist.style.display = 'flex'
        }
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('add-playlist-modal', AddPlaylistModal)