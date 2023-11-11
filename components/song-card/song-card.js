const template = document.createElement('template')

const html = await (await fetch('../assets/song-card.html')).text()
template.innerHTML = html

export class SongCard extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(template.content.cloneNode(true))
    }

    async connectCallback(){

    }
}

customElements.define('songcard-comp', SongCard)