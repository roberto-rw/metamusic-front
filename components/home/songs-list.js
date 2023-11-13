export class SongList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const response = await fetch('../assets/home/songs-list.html');
        const html = await response.text();
        const template = document.createElement('template');
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('songlist-comp', SongList); 