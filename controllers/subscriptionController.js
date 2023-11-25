import { isAuthenticated } from "../service/userService"
import { getSubscriptions } from "../service/subcriptionService"
import page from "page"

export async function loadSubscriptionPage() {
    if (await isAuthenticated()) {

        const html = await fetch("/pages/subscription.html").then((data) => data.text())
        document.getElementById("content").innerHTML = html
    } else {
        page.redirect('/')
    }
}