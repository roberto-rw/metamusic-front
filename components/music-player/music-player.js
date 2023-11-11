import { MusicApi } from "../../service/music-api"

const template = document.createElement('template')

const html = await (await fetch('../assets/music-player.html')).text()
template.innerHTML = html

export class Player extends HTMLElement {
    #api = new MusicApi()
    #song

    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
    }

    async connectedCallback() {
        await this.#getSong('484717632')

        const audio = this.shadowRoot.getElementById('audio');
        const playButton = this.shadowRoot.querySelector('img[alt="playBtn"]');
        const progress = this.shadowRoot.getElementById('progress');
        const volumeControl = this.shadowRoot.querySelector('#volume');

        audio.src = this.#song.preview;

        playButton.addEventListener('click', () => this.#togglePlay(audio));
        audio.addEventListener('timeupdate', () => this.#updateProgress(audio, progress));


        volumeControl.addEventListener('input', () => {
            volumeControl.style.setProperty('--volume-percentage', `${volumeControl.value * 100}%`);
            audio.volume = volumeControl.value;
        });

    }

    async #getSong(id) {
        this.#song = await this.#api.getSong(id);
        console.log(this.#song);
    }

    #togglePlay(audio) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    #updateProgress(audio, progress) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

customElements.define('musicplayer-comp', Player)