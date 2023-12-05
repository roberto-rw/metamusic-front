const template = document.createElement('template')
const html = await (await fetch('../assets/modals/toast.html')).text()
template.innerHTML = html

export class ToastComponent extends HTMLElement {
    #container

    constructor() {
        super()
        this.#container = document.querySelector('#toast-container')
    }

    showToast(message, type) {
        const toast = this.createToast()

        const toastMessageContainer = toast.querySelector('#toast-message')
        const toastIconContainer = toast.querySelector('#toast-icon')
        const toastMessage = toast.querySelector('#message')
        const toastIcon = toast.querySelector('#icon')

        toastMessage.innerHTML = message
        toast.classList.remove('hidden', 'animate-fadeOutRight')
        switch (type) {
            case 'error':
                toastMessageContainer.classList.remove('bg-green-700', 'bg-gray-700')
                toastIconContainer.classList.remove('bg-green-700', 'bg-gray-700')
                toastIcon.src = '/warning.svg'
                break
            case 'success':
                toastMessageContainer.classList.remove('bg-red-700', 'bg-gray-700')
                toastIconContainer.classList.remove('bg-red-700', 'bg-gray-700')
                toastIcon.src = '/success.svg'
                break
            default:
                toastMessageContainer.classList.remove('bg-green-700', 'bg-red-700')
                toastIconContainer.classList.remove('bg-green-700', 'bg-red-700')
                toastIcon.src = '/info.svg'
                break
        }

        setTimeout(() => {
            console.log('removing toast')
            toast.classList.remove('animate-fadeInRight')
            toast.classList.add('animate-fadeOutRight')
            toast.addEventListener('animationend', () => {
                this.#container.removeChild(toast)
            }, { once: true })
        }, 2000)

        this.#container.appendChild(toast)
    }

    createToast() {
        const temp = template.content.cloneNode(true)
        const toast = temp.querySelector('#toast')
        return toast
    }
}

customElements.define('toast-component', ToastComponent);