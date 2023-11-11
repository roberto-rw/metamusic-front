const template = document.createElement('template')

const html = await (await fetch('../assets/searchbar.html')).text()
template.innerHTML = html

export class Searchbar extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback(){

    }
}

customElements.define('searchbar-comp', Searchbar)