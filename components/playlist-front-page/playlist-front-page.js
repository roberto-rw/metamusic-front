const template = document.createElement('template')
const html = await (await fetch('../assets/playlist-front-page.html')).text()
template.innerHTML = html

export class PlaylistFrontPage extends HTMLElement {
    #songsContainer
    #playlistId
    #titleElement
    #authorElement
    #imageElement
    #imageContainer
    #imagebgElement
    #playPlaylistButton
    #songs = []
    #removeSongMenu

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.#songsContainer = this.shadowRoot.querySelector('#songs-container')
        this.#titleElement = this.shadowRoot.querySelector('#title')
        this.#authorElement = this.shadowRoot.querySelector('#author')
        this.#imageElement = this.shadowRoot.querySelector('#image')
        this.#imageContainer = this.shadowRoot.querySelector('#playlist-image-container')
        this.#imagebgElement = this.shadowRoot.querySelector('#image-bg')
        this.#playPlaylistButton = this.shadowRoot.querySelector('#playPlaylist')
        this.#removeSongMenu = this.shadowRoot.querySelector('#remove-song-menu')
    }

    connectedCallback() {
        this.#createSongCards()
        this.#setTitle()
        this.#setAuthor()
        this.#setImage()
        this.#setId()

        if (this.hasAttribute('editable')) {
            this.#imageContainer.addEventListener('click', () => this.#handleEditPlaylist())
        }
        else {
            this.#onlyView()
        }

        this.#playPlaylistButton.addEventListener('click', () => this.#handlePlayPlaylist())
        this.addEventListener('songRemoved', (event) => {
            const newSongs = event.detail
            this.#updateSongs(newSongs)
        })
    }

    #onlyView() {
        this.#imageContainer.classList.remove('group', 'hover:cursor-pointer')
    }

    #updateSongs(newSongs) {
        this.#songsContainer.innerHTML = ''
        this.#songs = newSongs
        newSongs.forEach(song => {
            const songCard = this.#createSongCard(song)
            this.#songsContainer.appendChild(songCard)
        });
    }

    #handleEditPlaylist() {
        const editPlaylistModal = document.querySelector('edit-playlist-modal')
        if (editPlaylistModal) {
            editPlaylistModal.setAttribute('playlist', JSON.stringify({ name: this.getAttribute('name'), description: this.getAttribute('description'), image: this.getAttribute('image'), id: this.getAttribute('id') }))
            editPlaylistModal.open = 'true'
        }
    }

    #handlePlayPlaylist() {
        if (this.#songs.length === 0) {
            const toast = document.querySelector('toast-component')
            toast.showToast('Esta playlist no tiene canciones', '!')
            return
        }
        this.#handlePlaylistHistory()

        this.dispatchEvent(new CustomEvent('addSongsQueue', {
            detail: {
                songs: this.#songs
            },
            bubbles: true,
            composed: true
        }))
    }

    #handlePlaylistHistory() {
        let playlistHistorial = JSON.parse(localStorage.getItem('playlist-historial')) || []
        const playlist = {
            id: this.getAttribute('id')
        }

        const index = playlistHistorial.findIndex(pl => pl.id === playlist.id);

        if (index !== -1) {
            playlistHistorial.splice(index, 1);
        }

        playlistHistorial.unshift(playlist);
        localStorage.setItem('playlist-historial', JSON.stringify(playlistHistorial));
    }

    #setTitle() {
        this.#titleElement.innerHTML = this.getAttribute('name')
    }

    #setAuthor() {
        this.#authorElement.innerHTML = `by ${sessionStorage.getItem('username')}`

        if (!this.hasAttribute('editable')) {
            this.#authorElement.classList.add('hidden')
        }

    }

    #setImage() {
        this.#imageElement.setAttribute('src', this.getAttribute('image'))
        this.#imagebgElement.setAttribute('style', `background-image: url(${this.getAttribute('image')})`)
    }

    #setId() {
        this.#playlistId = this.getAttribute('id')
    }

    #createSongCards() {
        this.#songsContainer.innerHTML = ''

        if (!this.getAttribute('songs')) {
            return
        }

        const songs = JSON.parse(this.getAttribute('songs'))
        this.#songs = songs
        songs.forEach(song => {
            const songCard = this.#createSongCard(song)
            this.#songsContainer.appendChild(songCard)
        });
    }

    #createSongCard(song) {
        const songCard = document.createElement('songcard-comp')
        songCard.setAttribute('img', song.image)
        songCard.setAttribute('name', song.name)
        songCard.setAttribute('duration', song.duration)
        songCard.setAttribute('artist', song.singers)
        songCard.setAttribute('idsong', song.idsong)

        if (this.hasAttribute('editable')) {
            songCard.addEventListener('contextmenu', (event) => {
                event.preventDefault();

                this.#removeSongMenu.show(event, songCard.getAttribute('idsong'), this.#playlistId);
            });
        }



        return songCard
    }
}

customElements.define('playlist-front-page-comp', PlaylistFrontPage)