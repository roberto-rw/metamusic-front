import { getSong } from "../../service/music-api.js"

const template = document.createElement('template')

const html = await (await fetch('../assets/music-player.html')).text()
template.innerHTML = html

export class Player extends HTMLElement {
    #song
    #actualSong
    #queue
    #playedSongs
    #repeat
    #random
    #repeatImg
    #audio
    #playButton
    #progress
    #volumeControl
    #progressContainer
    #fullscreenButton
    #exitFullScreenButton
    #nextButton
    #prevButton
    #repeatButton
    #songDataContainer
    #musicPlayer
    #titleArtistContainer
    #songImage
    #fullScreenModeActvated
    #spaceContainer
    #randomButton

    #originalQueue = []

    constructor() {
        super()
        this.#song = null
        this.#actualSong = null
        this.#queue = []
        this.#playedSongs = []
        this.#repeat = false
        this.#random = false
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
        this.#repeatImg = this.shadowRoot.getElementById('repeat-img')
        this.#songDataContainer = this.shadowRoot.getElementById('song-data-container')
        this.#musicPlayer = this.shadowRoot.getElementById('music-player')
        this.#exitFullScreenButton = this.shadowRoot.getElementById('exit-full-screen')
        this.#titleArtistContainer = this.shadowRoot.getElementById('title-artist-container')
        this.#songImage = this.shadowRoot.getElementById('image')
        this.#fullScreenModeActvated = false
        this.#spaceContainer = this.shadowRoot.getElementById('space-cont')
        this.#randomButton = this.shadowRoot.getElementById('random-songs')
    }

    async connectedCallback() {
        this.#audio.volume = 0.3
        this.#playButton.addEventListener('click', () => this.#togglePlay(this.#audio))
        this.#audio.addEventListener('timeupdate', () => this.#updateProgress(this.#audio, this.#progress))
        this.#progressContainer.addEventListener('click', (event) => this.#seek(event, this.#audio, this.#progress))
        this.#volumeControl.addEventListener('input', () => this.#updateVolume(this.#audio, this.#volumeControl))

        this.#nextButton.addEventListener('click', () => this.#playNextSong())
        this.#prevButton.addEventListener('click', () => this.#playPrevSong())
        this.#repeatButton.addEventListener('click', () => this.#handleRepeat())
        this.#randomButton.addEventListener('click', () => this.#handleRandom())


        document.addEventListener('cardSelected', async (event) => {
            this.#queue = []
            this.#playedSongs = []
            this.#actualSong = null

            const songDetails = event.detail
            console.log(songDetails)
            this.#queue.push(songDetails) // Add the song to the queue

            // If the queue was empty, start playing the song
            if (this.#queue.length === 1) {
                this.#playNextSong()
            }
        })

        document.addEventListener('addSongsQueue', async (event) => {
            this.#queue = []
            this.#playedSongs = []
            this.#actualSong = null

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

        this.#songImage.addEventListener('click', () => {
            this.#fullScreenMode()
        })

        this.#fullscreenButton.addEventListener('click', () => {
            this.#fullScreenMode()
        })

        this.#exitFullScreenButton.addEventListener('click', () => {
            this.#exitFullScreenMode()
        })
    }

    #fullScreenMode() {
        if (!this.#actualSong) return
        this.dispatchEvent(new CustomEvent('fullScreenSong', {
            detail: {
                name: this.#actualSong.name,
                singers: this.#actualSong.singers,
                image: this.#actualSong.image
            },
            bubbles: true,
            composed: true
        }))

        this.#musicPlayer.classList.add('h-48')
        this.#musicPlayer.classList.remove('h-28')

        this.#fullscreenButton.classList.add('hidden')
        this.#exitFullScreenButton.classList.remove('hidden')
        this.#spaceContainer.classList.remove('hidden')
        this.#songDataContainer.classList.add('hidden')
        this.#fullScreenModeActvated = true
    }

    #exitFullScreenMode() {
        this.#musicPlayer.classList.remove('h-48')
        this.#musicPlayer.classList.add('h-28')

        this.#spaceContainer.classList.add('hidden')
        this.#fullscreenButton.classList.remove('hidden')
        this.#exitFullScreenButton.classList.add('hidden')
        this.#songDataContainer.classList.remove('hidden')

        this.dispatchEvent(new CustomEvent('exitFullScreenSong', {
            bubbles: true,
            composed: true
        }))

        this.#fullScreenModeActvated = false
    }

    #handleRandom() {
        if (this.#random) {
            console.log('unshuffle')
            this.#random = false
            this.#randomButton.src = '/random.svg'
        } else {
            console.log('shuffle')
            this.#random = true
            this.#randomButton.src = '/random-active.svg'
            this.#shuffleQueue()
        }
    }

    #handleRepeat() {
        if (this.#repeat) {
            this.#repeat = false
            this.#repeatImg.src = '/repeat.svg'
        } else {
            this.#repeat = true
            this.#repeatImg.src = '/repeat-active.svg'
        }
    }



    async #playNextSong() {
        if (this.#queue.length === 0 && this.#repeat) {
            const currentSongIndex = this.#playedSongs.indexOf(this.#actualSong);
            if (currentSongIndex > -1) {
                this.#playedSongs.splice(currentSongIndex, 1);
            }
            this.#queue = [...this.#playedSongs, this.#actualSong]

            this.#playedSongs = []
            this.#actualSong = null
        }

        if (this.#queue.length > 0) {
            const nextSong = this.#queue.shift()
            if (this.#actualSong) {
                this.#playedSongs.push(this.#actualSong)
            }

            this.#actualSong = nextSong
            this.#dispatchChangeSongEvent()
            await this.#getSong(nextSong.idsong)
            this.#audio.src = this.#song.preview
            this.#audio.play()
            this.#playButton.src = '/pause-icon.svg'
            this.#printSong(nextSong)
        }
    }

    async #playPrevSong() {
        console.log(this.#playedSongs)
        if (this.#playedSongs.length > 0) {
            this.#queue.unshift(this.#actualSong)
            const prevSong = this.#playedSongs.pop()
            await this.#getSong(prevSong.idsong)
            this.#audio.src = this.#song.preview
            this.#audio.play()
            this.#playButton.src = '/pause-icon.svg'
            this.#printSong(prevSong)
            this.#actualSong = prevSong
            this.#dispatchChangeSongEvent()
        }
    }

    #shuffleQueue() {
        console.log(this.#queue)

        for (let i = this.#queue.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#queue[i], this.#queue[j]] = [this.#queue[j], this.#queue[i]];
        }

        console.log(this.#queue)

    }

    #dispatchChangeSongEvent() {
        this.dispatchEvent(new CustomEvent('changeSong', {
            detail: {
                name: this.#actualSong.name,
                singers: this.#actualSong.singers,
                image: this.#actualSong.image
            },
            bubbles: true,
            composed: true
        }))
    }

    #printSong(details) {
        this.shadowRoot.getElementById("title").textContent = details.name
        this.shadowRoot.getElementById("artist").textContent = details.singers
        this.shadowRoot.getElementById("image").src = details.image

        if (this.#fullScreenModeActvated) return
        this.shadowRoot.getElementById("image").classList.remove("hidden")
    }

    async #getSong(id) {
        this.#song = await getSong(id)
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
}

customElements.define('musicplayer-comp', Player)