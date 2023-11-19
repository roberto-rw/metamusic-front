import { isAuthenticated } from "../service/userService"

export async function loadSearchSongPage() {
    if (await isAuthenticated()) {
        const html = await fetch("/pages/search.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}

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