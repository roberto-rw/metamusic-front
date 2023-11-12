const template = document.createElement('template')

const html = await (await fetch('../assets/song-page.html')).text()
template.innerHTML = html

export class SongPage extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(template.content.cloneNode(true))
    }

    async connectCallback(){

    }
}

customElements.define('song-page-comp', SongPage)