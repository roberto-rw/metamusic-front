import page from 'page'
import * as userController from '../controllers/userController.js'
import * as playlistController from '../controllers/playlistController.js'
/* import * as songController from '../controllers/songController.js' */

page('/', userController.homeController)
page('/playlists/:username', playlistController.playlistsUsernameController)
page('/playlists', playlistController.playlistsController)
page('/search', playlistController.searchController)

document.addEventListener('DOMContentLoaded', (event) => {
    page.start()
})

export default page