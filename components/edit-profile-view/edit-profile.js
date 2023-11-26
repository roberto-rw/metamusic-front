import { editUser } from "../../service/userService"

const template = document.createElement('template')
const html = await (await fetch('../assets/edit-profile.html')).text()
template.innerHTML = html

export class EditProfile extends HTMLElement{
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const username = this.shadowRoot.querySelector('#username');
        const email = this.shadowRoot.querySelector('#email');
        const inputUsername = this.shadowRoot.querySelector('#input-username');
        const inputEmail = this.shadowRoot.querySelector('#input-email');
        const button = this.shadowRoot.querySelector('#edit-profile-button');

        username.textContent = sessionStorage.getItem('username');
        email.textContent = sessionStorage.getItem('email');
        inputUsername.value = sessionStorage.getItem('username');
        inputEmail.value = sessionStorage.getItem('email');

        button.addEventListener('click', async () => this.#editProfile())
    }

    async #editProfile(){
        let newData = null;
        if(this.shadowRoot.querySelector('#input-password').value == ''){
            newData = {
                username: this.shadowRoot.querySelector('#input-username').value,
                email: this.shadowRoot.querySelector('#input-email').value
            }
        }else{
            newData = {
                username: this.shadowRoot.querySelector('#input-username').value,
                email: this.shadowRoot.querySelector('#input-email').value,
                password: this.shadowRoot.querySelector('#input-password').value,
            }
        }
        const newUserData = await editUser(newData);
        console.log(newUserData);
        this.#updateSessionStorage(newUserData);
    }

    #updateSessionStorage({username, email, id}){
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('email', email);
    }
}

customElements.define('edit-profile', EditProfile)