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

        const audio = this.shadowRoot.getElementById('audio')
        const playButton = this.shadowRoot.querySelector('img[alt="playBtn"]')
        const progress = this.shadowRoot.getElementById('progress')
        const volumeControl = this.shadowRoot.querySelector('#volume')
        const progressContainer = this.shadowRoot.getElementById('progressContainer')

        audio.src = this.#song.preview

        playButton.addEventListener('click', () => this.#togglePlay(audio))
        audio.addEventListener('timeupdate', () => this.#updateProgress(audio, progress))

        progressContainer.addEventListener('click', (event) => this.#seek(event, audio, progress))

        volumeControl.addEventListener('input', () => {
            volumeControl.style.setProperty('--volume-percentage', `${volumeControl.value * 100}%`)
            audio.volume = volumeControl.value
        });

        document.addEventListener('cardSelected', async (event) => {
            let playlistId = event.detail.cardId
            await this.#getSong(playlistId)
            audio.src = this.#song.preview
            audio.play()
            playButton.src = 'pause-icon.svg'
        });
    }

    startListening() {
        let playlistCard = document.querySelector('playlistcard-comp')

        playlistCard.addEventListener('cardSelected', async (event) => {
            let playlistId = event.detail.cardId
            await this.#getSong(playlistId)
            let audio = this.shadowRoot.getElementById('audio')
            audio.src = this.#song.preview
            audio.play()
        });
    }

    async #getSong(id) {
        this.#song = await this.#api.getSong(id)
        console.log(this.#song)
    }

    #seek(event, audio, progress) {
        const rect = progress.getBoundingClientRect();
        const clickPositionInPixels = event.clientX - rect.left;
        const progressBarWidthInPixels = rect.width;
        const clickPositionRatio = clickPositionInPixels / progressBarWidthInPixels;
        if (isFinite(audio.duration)) {
            audio.currentTime = clickPositionRatio * audio.duration;
        }
    }

    #togglePlay(audio) {
        const playButton = this.shadowRoot.querySelector('img[alt="playBtn"]');
        if (audio.paused) {
            audio.play()
            playButton.src = 'pause-icon.svg'
        } else {
            audio.pause()
            playButton.src = 'play-icon.svg'
        }
    }

    #updateProgress(audio, progress) {
        const progressPercent = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressPercent}%`
    }
}

customElements.define('musicplayer-comp', Player)