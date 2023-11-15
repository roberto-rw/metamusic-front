import { api } from '../service/metamusic-api.js'
import page from 'page'


export async function homeController() {
    const header = document.getElementById('header')
    const sidebar = document.getElementById('sidebar')
    const musicplayer = document.getElementById('musicplayer')

    if (await api.isAuthenticated()) {
        console.log('entrara a home');
        // Si el usuario está autenticado, muestra los componentes
        header.style.display = 'block'
        sidebar.style.display = 'block'
        musicplayer.style.display = 'block'

        const html = await fetch("/pages/home.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        console.log('entrara a login');
        // Si el usuario no está autenticado, oculta los componentes
        header.style.display = 'none'
        sidebar.style.display = 'none'
        musicplayer.style.display = 'none'

        const html = await fetch("/pages/login.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    }
}