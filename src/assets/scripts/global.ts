import './lightbox.ts';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Mobile menu handling
const hamburgerIcon = document.getElementById('hamburger');
document.getElementById('hamburger')?.addEventListener('click', () => {
	document.getElementById('main-menu')?.classList.toggle('expanded');
	hamburgerIcon?.classList.toggle('icon-close');
});
