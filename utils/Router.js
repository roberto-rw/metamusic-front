import page from 'page'
import * as userController from '../controllers/userController.js'
import * as playlistController from '../controllers/playlistController.js'
/* import * as songController from '../controllers/songController.js' */

page('/', userController.homeController)

page('/playlist/:name', playlistController.playlistsUsernameController)
page('/playlist', playlistController.playlistsController)

page('/song', playlistController.songController)

page('/search', playlistController.searchController)

document.addEventListener('DOMContentLoaded', (event) => {
    page.start()
})

export default page