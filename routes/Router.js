import page from 'page'

import { loadPlaylistsPage, deployPlaylist, loadRecommended } from '../controllers/playlistController.js'
import { homeController } from '../controllers/userController.js'
import { loadSearchSongPage } from '../controllers/songController.js'
import { loadSubscriptionPage } from '../controllers/subscriptionController.js'
import { profileController } from '../controllers/userController.js'
import { editProfileController } from '../controllers/userController.js'

page('/', homeController)

page('/playlist/:name', deployPlaylist)
page('/playlist', loadPlaylistsPage)
//page('/song', playlistController.songController)
page('/search', loadSearchSongPage)
page('/subscription', loadSubscriptionPage)
page('/profile', profileController)
page('/edit-profile', editProfileController)
page('/recommended/:name', loadRecommended)
page('*', () => {
    const toast = document.querySelector('toast-component')

    toast.showToast('Esta página no existe', '!')
    page.redirect('/')
})

document.addEventListener('DOMContentLoaded', (event) => {
    page.start()
})

export default page