import { toMinutes } from "../../utils/convertSeconds"

const template = document.createElement('template')

const html = await (await fetch('../assets/song-card.html')).text()
template.innerHTML = html

export class AdminSongCard extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        this.shadowRoot.querySelector('img').src = this.getAttribute('img');
        this.shadowRoot.querySelector('#name').textContent = this.getAttribute('name');
        this.shadowRoot.querySelector('#duration').textContent = toMinutes(this.getAttribute('duration'));
        this.shadowRoot.querySelector('#artist').textContent = this.getAttribute('artist');

        const isAdmin = this.getAttribute('admin') === 'true';

        if (isAdmin) {
            const saveButton = document.createElement('button');
            saveButton.textContent = '+';
            saveButton.addEventListener('click', async () => {
                const savedSong = await saveSong({
                    idsong: this.getAttribute('idsong'),
                    name: this.getAttribute('name'),
                    singers: this.getAttribute('artist'),
                    image: this.getAttribute('img'),
                });  
                console.log('Song saved:', savedSong);
            });
            this.shadowRoot.appendChild(saveButton);
        }

        this.shadowRoot.querySelector('#img-container').addEventListener('click', () => {
            this.togglePlayPause()
            this.dispatchEvent(new CustomEvent('cardSelected', {
                detail: {
                    idsong: this.getAttribute('idsong'),
                    name: this.getAttribute('name'),
                    singers: this.getAttribute('artist'),
                    image: this.getAttribute('img')
                },
                bubbles: true,
                composed: true
            }))
        });
    }

}
customElements.define('adminsongcard-comp', AdminSongCard)
