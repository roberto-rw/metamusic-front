import page from 'page'
import { loadPlaylistsPage } from '../controllers/playlistController.js'
import { homeController } from '../controllers/userController.js'
import { loadSearchSongPage } from '../controllers/songController.js'

page('/', homeController)

//page('/playlist/:name', playlistController.playlistsUsernameController)
page('/playlist', loadPlaylistsPage)
//page('/song', playlistController.songController)
page('/search', loadSearchSongPage)

document.addEventListener('DOMContentLoaded', (event) => {
    page.start()
})

export default page