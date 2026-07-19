markExternalLinks();

function markExternalLinks() {
	document.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {
		if (link.hostname != globalThis.location.hostname) {
			link.classList.add('external');
		}
	});
}

// Mobile menu handling
const hamburgerIcon = document.getElementById('hamburger');
document.getElementById('hamburger')?.addEventListener('click', () => {
	document.getElementById('main-menu')?.classList.toggle('expanded');
	hamburgerIcon?.classList.toggle('icon-close');
});
