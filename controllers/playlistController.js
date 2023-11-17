import { api } from '../service/metamusic-api.js'
import page from 'page'

export async function playlistsController() {
    if (await api.isAuthenticated()) {
        let username = sessionStorage.getItem('username');
        const playlists = await api.getPlaylistUsername(username)
        const playlistsComp = document.createElement('playlists-comp')
        playlistsComp.setAttribute('playlists', JSON.stringify(playlists))
        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(playlistsComp)
    } else {
        page.redirect('/')
    }
}

export async function playlistsUsernameController(ctx) {
    if (await api.isAuthenticated()) {
        const name = ctx.params.name

        /* const playlists = await api.getPlaylistUsername(username)
        const playlistsComp = document.createElement('playlists-comp')
        playlistsComp.setAttribute('playlists', JSON.stringify(playlists)) */

        const html = await fetch("/pages/playlist.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }

}


// move this functions to another controller

export async function searchController() {
    if (await api.isAuthenticated()) {
        const html = await fetch("/pages/search.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}

export async function songController(ctx) {
    if (await api.isAuthenticated()) {
        const id = ctx.params.id

        /* const song = await api.getSong(id)
        const songComp = document.createElement('song-comp')
        songComp.setAttribute('song', JSON.stringify(song)) */

        const html = await fetch("/pages/song.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}

