import './lightbox.ts';

// Mobile menu handling
const hamburgerIcon = document.getElementById('hamburger');
document.getElementById('hamburger')?.addEventListener('click', () => {
	document.getElementById('main-menu')?.classList.toggle('expanded');
	hamburgerIcon?.classList.toggle('icon-close');
});

// Social icons
const socialIcons = document.querySelectorAll('.social-icon');
for (const icon of socialIcons) {
	document.querySelectorAll('[data-icon=' + '"' + `${icon.getAttribute('data-icon')}` + '"]')
	.forEach(icon => {
		(icon as HTMLElement).style.mask = `var(--icon-${icon.getAttribute('data-icon')?.toLowerCase()})`;
	});
};
