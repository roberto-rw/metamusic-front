import { MusicApi } from "../../service/music-api"
import page from 'page';

const template = document.createElement('template')

const html = await (await fetch('../assets/music-player.html')).text()
template.innerHTML = html

export class Player extends HTMLElement {
    #api
    #song

    #actualSong
    #queue
    #playedSongs
    #repeat

    #audio
    #playButton
    #progress
    #volumeControl
    #progressContainer
    #fullscreenButton
    #nextButton
    #prevButton
    #repeatButton

    constructor() {
        super()
        this.#api = new MusicApi()
        this.#song = null
        this.#actualSong = null
        this.#queue = []
        this.#playedSongs = []
        this.#repeat = false
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#audio = this.shadowRoot.getElementById('audio')
        this.#playButton = this.shadowRoot.querySelector('img[alt="playBtn"]')
        this.#progress = this.shadowRoot.getElementById('progress')
        this.#volumeControl = this.shadowRoot.querySelector('#volume')
        this.#progressContainer = this.shadowRoot.getElementById('progressContainer')
        this.#fullscreenButton = this.shadowRoot.getElementById('fullscreen')
        this.#nextButton = this.shadowRoot.getElementById('next-song')
        this.#prevButton = this.shadowRoot.getElementById('prev-song')
        this.#repeatButton = this.shadowRoot.getElementById('repeat-songs')
    }

    async connectedCallback() {
        this.#audio.volume = 0.3
        this.#playButton.addEventListener('click', () => this.#togglePlay(this.#audio))
        this.#audio.addEventListener('timeupdate', () => this.#updateProgress(this.#audio, this.#progress))
        this.#progressContainer.addEventListener('click', (event) => this.#seek(event, this.#audio, this.#progress))
        this.#volumeControl.addEventListener('input', () => this.#updateVolume(this.#audio, this.#volumeControl))
        this.#fullscreenButton.addEventListener('click', () => this.#handleFullscreenClick())

        this.#nextButton.addEventListener('click', () => this.#playNextSong())
        this.#prevButton.addEventListener('click', () => this.#playPrevSong())
        this.#repeatButton.addEventListener('click', () => this.#handleRepeat())


        document.addEventListener('cardSelected', async (event) => {
            this.#queue = []

            const songDetails = event.detail
            this.#queue.push(songDetails) // Add the song to the queue

            // If the queue was empty, start playing the song
            if (this.#queue.length === 1) {
                this.#playNextSong()
            }
        })

        document.addEventListener('addSongsQueue', async (event) => {
            this.#queue = []

            const songs = event.detail.songs
            this.#queue.push(...songs)

            if (this.#queue.length > 0) {
                this.#playNextSong()
            }
        })

        document.addEventListener('logout', async (event) => {
            this.#queue = []
            this.#playedSongs = []
            this.#actualSong = null
            this.#audio.src = ''

            this.#audio.pause()
            this.#audio.currentTime = 0
        })

        this.#audio.addEventListener('ended', () => {
            this.#playButton.src = '/play-icon.svg'
            this.#playNextSong()
        })
    }

    #handleRepeat() {
        if (this.#repeat) {
            this.#repeat = false
            this.#repeatButton.classList.remove('font-bold', 'text-sky-800')
        } else {
            this.#repeat = true
            this.#repeatButton.classList.add('font-bold', 'text-sky-800')
        }
    }

    async #playNextSong() {
        if (this.#queue.length > 0) {
            const nextSong = this.#queue.shift()

            if (this.#actualSong) {
                this.#playedSongs.push(this.#actualSong)
            }

            this.#actualSong = nextSong
            await this.#getSong(nextSong.idsong)

            this.#audio.src = this.#song.preview
            this.#audio.play()
            this.#playButton.src = '/pause-icon.svg'
            this.#printSong(nextSong)
        }
        else {
            if (this.#repeat) {
                this.#playedSongs.push(this.#actualSong)
                this.#actualSong = null
                this.#queue = this.#playedSongs
                this.#playedSongs = []
                this.#playNextSong()
            }
        }
    }

    async #playPrevSong() {
        if (this.#playedSongs.length > 0) {
            const prevSong = this.#playedSongs.pop()
            await this.#getSong(prevSong.idsong)
            this.#audio.src = this.#song.preview
            this.#audio.play()
            this.#playButton.src = '/pause-icon.svg'
            this.#printSong(prevSong)

            if (this.#actualSong) {
                this.#queue.unshift(this.#actualSong)
            }

            this.#actualSong = prevSong
        }
    }

    #printSong(details) {
        this.shadowRoot.getElementById("title").textContent = details.name
        this.shadowRoot.getElementById("artist").textContent = details.singers
        this.shadowRoot.getElementById("image").classList.remove("hidden")
        this.shadowRoot.getElementById("image").src = details.image
    }

    async #getSong(id) {
        this.#song = await this.#api.getSong(id)
    }

    #seek(event, audio, progress) {
        const rect = this.#progress.getBoundingClientRect()
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
            playButton.src = '/pause-icon.svg'
        } else {
            audio.pause()
            playButton.src = '/play-icon.svg'
        }
    }

    #updateProgress(audio, progress) {
        const progressPercent = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressPercent}%`
    }

    #updateVolume(audio, volumeControl) {
        audio.volume = volumeControl.value * 0.3
        volumeControl.style.setProperty('--volume-percentage', `${volumeControl.value * 100}%`)
    }

    #handleFullscreenClick() {
        page.redirect('/song');
    }
}

customElements.define('musicplayer-comp', Player)