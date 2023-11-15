import { api } from '../service/metamusic-api.js'
import page from 'page'


export async function playlistsController() {
    console.log('entro al controlador playlists')
    if (await api.isAuthenticated()) {
        console.log('entrara a playlists');
        let username = sessionStorage.getItem('username');
        const playlists = await api.getPlaylistUsername(username)
        const playlistsComp = document.createElement('playlists-comp')
        playlistsComp.setAttribute('playlists', JSON.stringify(playlists))
        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(playlistsComp)
    } else {
        console.log('entrara a login');
        page.redirect('/')
    }
}

export async function playlistsUsernameController(ctx) {
    if (await api.isAuthenticated()) {
        const username = ctx.params.username
        const playlists = await api.getPlaylistUsername(username)
        const playlistsComp = document.createElement('playlists-comp')
        playlistsComp.setAttribute('playlists', JSON.stringify(playlists))
        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(playlistsComp)
    } else {
        page.redirect('/')
    }

}

export async function searchController() {
    if (await api.isAuthenticated()) {
        const html = await fetch("/pages/search.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}

