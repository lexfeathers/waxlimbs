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

// Socials
const socials = {
	iconInstagram: document.querySelectorAll('.Instagram'),
	iconTiktok: document.querySelectorAll('.Tiktok'),
	iconYoutube: document.querySelectorAll('.YouTube'),
	iconBsky: document.querySelectorAll('.Bsky'),
	iconMastodon: document.querySelectorAll('.Mastodon'),
	iconBandcamp: document.querySelectorAll('.Bandcamp'),
};

// Set social icons
socials.iconInstagram.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-instagram)`;
});
socials.iconTiktok.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-tiktok)`;
});
socials.iconYoutube.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-youtube)`;
});
socials.iconBsky.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-bsky)`;
});
socials.iconMastodon.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-mastodon)`;
});
socials.iconBandcamp.forEach((icon: Element) => {
	(icon as HTMLDivElement).style.mask = `var(--icon-bandcamp)`;
});
