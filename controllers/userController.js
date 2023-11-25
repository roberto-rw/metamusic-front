import { isAuthenticated, logout } from '../service/userService'
import page from 'page'

export async function homeController() {
    const header = document.getElementById('header')
    const sidebar = document.getElementById('sidebar')
    const musicplayer = document.getElementById('musicplayer')

    if (await isAuthenticated()) {
        // Si el usuario está autenticado, muestra los componentes
        header.style.display = 'block'
        sidebar.style.display = 'block'
        musicplayer.style.display = 'block'

        const html = await fetch("/pages/home.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        // Si el usuario no está autenticado, oculta los componentes
        header.style.display = 'none'
        sidebar.style.display = 'none'
        musicplayer.style.display = 'none'

        const html = await fetch("/pages/login.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    }
}

export async function logoutController() {
    const response = await logout()
    if (response.success) {
        sessionStorage.removeItem('username')
        page.redirect('/')
    }
    else {
        console.error('Error logging out:', response.error)
    }
}

export async function profileController(){
    if (await isAuthenticated()) {
        const html = await fetch("/pages/profile.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}