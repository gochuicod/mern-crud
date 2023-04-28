const userUtilities = {
    preventGoingBack: () => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => window.history.pushState(null, null, window.location.href);
    }
}

export default userUtilities