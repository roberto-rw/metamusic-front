import { toMinutes } from "../../utils/convertSeconds"

const template = document.createElement('template')

const html = await (await fetch('../assets/song-card.html')).text()
template.innerHTML = html

export class SongCard extends HTMLElement {
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
        
        
        this.shadowRoot.querySelector('#img-container').addEventListener('click', this.togglePlayPause.bind(this));

        this.addEventListener('click', () => {
            console.log('card clicked');
            this.dispatchEvent(new CustomEvent('cardSelected', {
                detail: {
                    cardId: this.getAttribute('idsong')
                },
                bubbles: true,
                composed: true
            }));
        }); 
    }

    // Cambia el icono de play y pausa
    togglePlayPause() {
        const playIcon = this.shadowRoot.querySelector('.play-icon');
        if (playIcon.textContent.trim() === '▶') {
            playIcon.textContent = '⏸';
        } else {
            playIcon.textContent = '▶';
        }
    }
}

customElements.define('songcard-comp', SongCard)