import { editUser } from "../../service/userService"
import { uploadImageProfile } from "../../service/cloudinaryService"
import page from 'page'

const template = document.createElement('template')
const html = await (await fetch('../assets/edit-profile.html')).text()
template.innerHTML = html

export class EditProfile extends HTMLElement {
    #imagePreview

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.#imagePreview = this.shadowRoot.querySelector('#image')
    }

    connectedCallback() {
        const username = this.shadowRoot.querySelector('#username');
        const email = this.shadowRoot.querySelector('#email');
        const inputUsername = this.shadowRoot.querySelector('#input-username');
        const inputEmail = this.shadowRoot.querySelector('#input-email');
        const button = this.shadowRoot.querySelector('#edit-profile-button')
        const editPhoto = this.shadowRoot.querySelector('#image-container')


        this.#imagePreview.src = sessionStorage.getItem('image')
        username.textContent = sessionStorage.getItem('username')
        email.textContent = sessionStorage.getItem('email')
        inputUsername.value = sessionStorage.getItem('username')
        inputEmail.value = sessionStorage.getItem('email')

        button.addEventListener('click', async () => this.#editProfile())
        editPhoto.addEventListener('click', async () => this.handleImageUpload())
    }

    async handleImageUpload() {
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
    }

    async #editProfile() {
        const toast = document.querySelector('toast-component')
        let newData = null;
        if (this.shadowRoot.querySelector('#input-password').value == '') {
            newData = {
                username: this.shadowRoot.querySelector('#input-username').value,
                email: this.shadowRoot.querySelector('#input-email').value
            }
        } else {
            newData = {
                username: this.shadowRoot.querySelector('#input-username').value,
                email: this.shadowRoot.querySelector('#input-email').value,
                password: this.shadowRoot.querySelector('#input-password').value,
            }
        }

        if (this.#imagePreview.src != sessionStorage.getItem('image')) {
            try {
                const image = await uploadImageProfile(this.#imagePreview.src, sessionStorage.getItem('id'))
                newData.image = image
            } catch (error) {
                console.error('Error:', error);
            }
        }

        const data = await editUser(newData)

        if (data.success) {
            toast.showToast('Se edito el usuario con exito', 'success');
            this.#updateSessionStorage(data);
            this.dispatchEvent(new CustomEvent('userEdited', {
                bubbles: true
            }))

            page.redirect('/profile')
        } else {
            toast.showToast(data.message, 'error');
        }
    }

    #updateSessionStorage({ username, email, id, image }) {
        sessionStorage.setItem('id', id)
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('image', image)
    }
}

customElements.define('edit-profile', EditProfile)