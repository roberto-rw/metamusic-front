export class SongCardHome extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const response = await fetch('../assets/home/song-card.html');
        const html = await response.text();
        const template = document.createElement('template');
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('songcardhome-comp', SongCardHome); 