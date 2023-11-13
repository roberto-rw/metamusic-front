export class HomeContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const response = await fetch('../assets/home/home-content.html');
        const html = await response.text();
        const template = document.createElement('template');
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const id = this.getAttribute('title');
        if (id) {
            const titleElement = this.shadowRoot.querySelector('#title');
            titleElement.textContent = id;
        }


        const playlists = [
            {
                img: "https://editorial.aristeguinoticias.com/wp-content/uploads/2023/06/JK-SEVEN-29062023.jpg",
                name: "Top hits",
                id: "2364618815"
            },
            {
                img: "https://blob.diariodelyaqui.mx/images/2021/06/27/yecorazo-jpeg-1624831497912-focus-min0.01-min0.25-732-549.jpg",
                name: "Travel",
                id: "1955330657"
            },
            {
                img: "https://i.blogs.es/71281f/shingeki/1366_2000.jpeg",
                name: "SNK",
                id: "1591561262"
            }
        ];

        const playlistContainer = this.shadowRoot.querySelector('article.grid');

        playlists.forEach(playlist => {
            const playlistCard = document.createElement('playlistcard-comp');
            playlistCard.setAttribute('img', playlist.img);
            playlistCard.setAttribute('name', playlist.name);
            playlistCard.setAttribute('id', playlist.id);
            playlistContainer.appendChild(playlistCard);
        });
    }
}

customElements.define('content-comp', HomeContent); 