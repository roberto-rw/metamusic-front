import page from 'page'
import { getPlaylistsByUser, getPlaylistByName } from '../service/playlistService';
import { isAuthenticated } from '../service/userService';

export async function loadPlaylistsPage() {
    if (await isAuthenticated()) {
        // let username = sessionStorage.getItem('username');
        const playlists = await getPlaylistsByUser()
        const playlistsComp = document.createElement('playlists-comp')
        playlistsComp.setAttribute('playlists', JSON.stringify(playlists))
        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(playlistsComp)
    } else {
        page.redirect('/')
    }
}

export async function deployPlaylist(ctx) {
    if (await isAuthenticated()) {
        const name = ctx.params.name

        // hacer que solo encuentra las del mismo user

        const playlist = await getPlaylistByName(name)

        const playlistComp = document.createElement('playlist-front-page-comp')
        playlistComp.setAttribute('name', playlist.name)
        playlistComp.setAttribute('author', playlist.user)
        playlistComp.setAttribute('description', playlist.description)
        playlistComp.setAttribute('image', playlist.image)
        playlistComp.setAttribute('songs', JSON.stringify(playlist.songs))
        playlistComp.setAttribute('id', playlist._id)

        document.getElementById("content").innerHTML = ''
        document.getElementById("content").appendChild(playlistComp)
    } else {
        page.redirect('/')
    }

}


// move this functions to another controller

// export async function searchController() {
//     if (await api.isAuthenticated()) {
//         const html = await fetch("/pages/search.html").then((data) => data.text())
//         document.getElementById("content").innerHTML = html
//     } else {
//         page.redirect('/')
//     }
// }

// export async function songController(ctx) {
//     if (await api.isAuthenticated()) {
//         const id = ctx.params.id

//         /* const song = await api.getSong(id)
//         const songComp = document.createElement('song-comp')
//         songComp.setAttribute('song', JSON.stringify(song)) */

//         const html = await fetch("/pages/song.html").then((data) => data.text())
//         document.getElementById("content").innerHTML = html
//     } else {
//         page.redirect('/')
//     }
// }

