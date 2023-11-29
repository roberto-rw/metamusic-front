import page from "page"
import { updatePlaylist } from "../../service/playlistService.js"
import { uploadImagePlaylist } from "../../service/cloudinaryService.js"

const template = document.createElement('template')
const html = await (await fetch('../assets/modals/edit-playlist-modal.html')).text()
template.innerHTML = html

export class EditPlaylistModal extends HTMLElement {
    #addPlaylist
    #btnClose
    #nameInput
    #descInput
    #createButton
    #imageContainer
    #imagePreview
    #originalImage
    #idPlaylist
    _onCloseCallback = null

    static get observedAttributes() {
        return ['open', 'onClose']
    }

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#idPlaylist = null
        this.#originalImage = null
        this.#imageContainer = this.shadowRoot.getElementById('image-container')
        this.#addPlaylist = this.shadowRoot.getElementById('add-playlist')
        this.#btnClose = this.shadowRoot.getElementById('btn-close-add-playlist')
        this.#nameInput = this.shadowRoot.querySelector('#name')
        this.#descInput = this.shadowRoot.querySelector('#desc')
        this.#createButton = this.shadowRoot.querySelector('#add-playlist-btn')
        this.#imagePreview = this.shadowRoot.querySelector('#image-preview')
    }

    connectedCallback() {
        this.#createButton.addEventListener('click', this.#handleUpdate)
        this.#btnClose.addEventListener('click', this.onClose)

        this.#imageContainer.addEventListener('click', () => {
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.accept = 'image/*'
            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onloadend = () => {
                    this.#imagePreview.src = reader.result;
                };
                if (file) {
                    reader.readAsDataURL(file);
                } else {
                    this.#imagePreview.src = ""
                }
            });
            fileInput.click()
        })

    }

    #handleUpdate = async () => {
        const id = this.#idPlaylist
        const name = this.#nameInput.value
        const description = this.#descInput.value
        const username = sessionStorage.getItem('username')

        try {
            let image

            if (this.#imagePreview.src !== this.#originalImage) {
                image = await uploadImagePlaylist(this.#imagePreview.src, username)
            } else {
                console.log('no se ha cambiado la imagen')
                image = this.#originalImage
            }

            const data = await updatePlaylist(id, name, description, image, username)

            if (data.success) {
                this.dispatchEvent(new CustomEvent('playlistUpdated', {
                    detail: {
                        playlist: data.playlist
                    },
                    bubbles: true,
                    composed: true
                }))


                this.onClose()
                page.redirect('/playlist/' + data.playlist.name)
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
            this.#handleOpen()
        }
    }

    #handleOpen() {
        this.#addPlaylist.style.display = 'flex'
        const playlist = JSON.parse(this.getAttribute('playlist'))

        if (playlist) {
            this.#idPlaylist = playlist.id
            this.#nameInput.value = playlist.name
            this.#descInput.value = playlist.description
            this.#imagePreview.src = playlist.image
            this.#originalImage = playlist.image
        }
    }

    get open() {
        return this.getAttribute('open')
    }

    set open(value) {
        this.setAttribute('open', value)
    }
}

customElements.define('edit-playlist-modal', EditPlaylistModal)