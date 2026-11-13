if (document.readyState === 'loading') {
	//   DOM hasn't loaded
	document.addEventListener('DOMContentLoaded', getImages);
} else {
	//   DOM has already loaded
	getImages();
}

function getImages() {
	const images = document.querySelectorAll('[data-type="image"] img');

	images.forEach((image, index) => {
		image.id = `image-lightbox-${index}`;
		image.parentElement?.addEventListener('click', (e) => {
			e.preventDefault();
		});
		image.addEventListener('click', lightbox);
	});
}

function lightbox(this: HTMLElement) {
	this.classList.toggle('lightbox');
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
	// Toggle lightbox class off when using escape key
	if (event.key === 'Escape') {
		// IKOV: in = keys, of = values
		for (const element of document.getElementsByClassName('lightbox')) {
			element.classList.remove('lightbox');
		}
	}
	// Navigate using arrow keys
	else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		NavigateImages(direction);
	}
});

// Navigate images with buttons
document
	.querySelectorAll('.button-previous')
	?.forEach(function (buttonElement) {
		buttonElement.addEventListener('click', () => {
			NavigateImages(-1);
		});
	});
document.querySelectorAll('.button-next')?.forEach(function (buttonElement) {
	buttonElement.addEventListener('click', () => {
		NavigateImages(1);
	});
});

// Close lightbox when clicking 'X'
document.querySelectorAll('.button-lightbox-close').forEach((button) => {
	button.addEventListener('click', () => {
		console.log('clicked!');
		document.querySelectorAll('.lightbox')[0].classList.remove('lightbox');
	});
});

function NavigateImages(direction: number): void {
	const currentLightbox = document
		.getElementsByClassName('lightbox')
		?.item(0);

	if (currentLightbox == null) return;

	const imageGrid =
		currentLightbox.parentElement?.parentElement?.parentElement;

	if (imageGrid?.attributes.getNamedItem('data-type')?.value != 'image-grid')
		return;

	const lightboxImages = imageGrid.querySelectorAll('img');

	let currentLightboxIndex = -1;

	lightboxImages.forEach((image: HTMLImageElement, index) => {
		if (image === currentLightbox) {
			currentLightboxIndex = index;
		}
	});

	if (currentLightboxIndex == -1) return;

	let nextLightboxIndex = currentLightboxIndex + direction;

	if (nextLightboxIndex < 0) {
		nextLightboxIndex = lightboxImages.length - 1;
	} else if (nextLightboxIndex == lightboxImages.length) {
		nextLightboxIndex = 0;
	}

	lightboxImages.item(currentLightboxIndex).classList.remove('lightbox');
	lightboxImages.item(nextLightboxIndex).classList.add('lightbox');
}
