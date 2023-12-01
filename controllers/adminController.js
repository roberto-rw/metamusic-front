import { logout } from '../service/adminService.js';

export async function adminLoginController() {
  // Cargar la página de login para administradores
  const html = await fetch("/pages/adminLogin.html").then((data) => data.text())
  document.getElementById("content").innerHTML = html;
  customElements.define('adminlogin-comp', adminLogin);
}

export async function addSongAdminController() {
  // Cargar la página de añadir canción para administradores
  const html = await fetch("/views/addSongAdmin.html").then((data) => data.text())
  document.getElementById("content").innerHTML = html;
}

export async function logoutController() {
    const response = await logout()
    if (response.success) {
        sessionStorage.removeItem('username')
        page.redirect('/admin')
    }
    else {
        console.error('Error logging out:', response.error)
    }
}