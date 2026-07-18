document.querySelectorAll("a").forEach((link: HTMLAnchorElement) => {
    if (link.hostname != globalThis.location.hostname) {
        link.classList.add("external")
    }
})