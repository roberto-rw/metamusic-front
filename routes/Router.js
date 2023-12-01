import page from 'page'

import { loadPlaylistsPage, deployPlaylist } from '../controllers/playlistController.js'
import { homeController } from '../controllers/userController.js'
import { loadSearchSongPage } from '../controllers/songController.js'
import { loadSubscriptionPage } from '../controllers/subscriptionController.js'
import { profileController } from '../controllers/userController.js'
import { editProfileController } from '../controllers/userController.js'
import { adminLoginController, addSongAdminController } from '../controllers/adminController.js';

page('/', homeController)

page('/admin', adminLoginController);
page('/addSongAdmin', addSongAdminController);

page('/playlist/:name', deployPlaylist)
page('/playlist', loadPlaylistsPage)
//page('/song', playlistController.songController)
page('/search', loadSearchSongPage)
page('/subscription', loadSubscriptionPage)
page('/profile', profileController)
page('/edit-profile', editProfileController)
page('*', () => {
    console.log('404')
    page.redirect('/')
})

document.addEventListener('DOMContentLoaded', (event) => {
    page.start()
})

export default page