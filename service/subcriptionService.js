import { ENDPOINTS } from "../config/endpoints";

export async function getSubscriptions() {
    const options = {
        method: "GET",
        credentials: 'include'
    }
    let response = await fetch(ENDPOINTS.SUBSCRIPTION_URL, options)
    let json = await response.json()
    return json
}