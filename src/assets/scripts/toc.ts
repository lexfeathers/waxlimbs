import { slugify } from './slugify.ts';

// Get headings
const headings = Array.from(
	document.querySelectorAll(
		'.main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content h5, .main-content h6'
	)
);

const toc = document.querySelectorAll('.toc');

applyHeadings();

function applyHeadings() {
	if (
		headings == null ||
		headings.length == 0 ||
		toc == null ||
		toc[0] == null
	)
		return;
	let currentParent: HTMLElement = document.createElement('ol');
	toc[0].appendChild(currentParent);

	let currentHeadingLevel = 0;
	for (const heading of headings) {
		if (heading.getAttribute('data-toc') != 'ignore') {
			// Skip any headings with a data-toc attribute value of 'ignore'
			currentHeadingLevel = getHeadingLevel(heading);
			break;
		}
	}

	let lastItem = null;

	for (let i = 0; i < headings.length; i++) {
		const heading = headings[i];
		const headingLevel = getHeadingLevel(heading);

		if (headingLevel == -1 || heading.getAttribute('data-toc') == 'ignore')
			continue;

		if (headingLevel > currentHeadingLevel) {
			const indentedList = document.createElement('ul');
			lastItem!.appendChild(indentedList);
			currentParent = indentedList;
		} else {
			while (headingLevel < currentHeadingLevel) {
				currentParent = currentParent.parentElement!;
				currentHeadingLevel--;
			}
		}

		currentHeadingLevel = headingLevel;

		heading.id = slugify(heading.textContent);

		const link = document.createElement('a');
		link.href = '#' + heading.id;
		link.textContent = heading.textContent;

		const listItem = document.createElement('li');
		currentParent.appendChild(listItem);

		listItem.appendChild(link);
		lastItem = listItem;
	}
}

function getHeadingLevel(element: Element): number {
	if (!(element instanceof HTMLHeadingElement)) return -1;
	return parseInt(element.outerHTML.at(2)!);
}
