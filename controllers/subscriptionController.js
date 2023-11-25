import { isAuthenticated } from "../service/userService"
import { getSubscriptions } from "../service/subcriptionService"
import page from "page"
import '../components/subscription-container/subscription-container.js' // Importa tu componente personalizado aquí

export async function loadSubscriptionPage() {
    if (await isAuthenticated()) {
        const html = await fetch("/pages/subscription.html").then((data) => data.text())
        console.log(html)
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}