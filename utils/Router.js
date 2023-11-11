const route = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.href)
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/home": "/pages/home.html",
    "/playlists": "/pages/playlists.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    console.log(path);
    const route = routes[path]
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("content").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();