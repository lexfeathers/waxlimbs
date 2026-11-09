import lume from '@lumeland/lume';
import icons from '@lumeland/plugin-icons';
import esbuild from '@lumeland/plugin-esbuild';
import slugify_urls from '@lumeland/plugin-slugify-urls';
import favicon from '@lumeland/plugin-favicon';
import metas from '@lumeland/plugin-metas';
import feed from '@lumeland/plugin-feed';
import sitemap from '@lumeland/plugin-sitemap';
import date from '@lumeland/plugin-date';
import extractOrder from '@lumeland/plugin-extract-order';
import basePath from '@lumeland/plugin-base-path';
import footnote from 'markdown-it-footnote';
// @ts-expect-error no types for markdown-it-implicit-figures
import implicitFigures from 'markdown-it-implicit-figures';
import resolveUrls from '@lumeland/plugin-resolve-urls';
import toc from '@lumeland/plugin-toc';
import { v4 as uuidv4 } from 'uuid';

const site = lume(
	{
		src: './src',
		location: new URL('https://waxlimbs.com'),
	},
	{
		markdown: {
			plugins: [
				footnote,
				[
					implicitFigures,
					{
						dataType: true,
						lazy: true,
						async: true,
						figcaption: 'alt',
						link: false,
					},
				],
			],
		},
	}
);

site.data('uuidv4', function () {
	return uuidv4();
});

site.use(
	icons({
		folder: '/assets/icons',
	})
)
	.use(
		esbuild({
			options: {
				minify: false,
			},
		})
	)
	.use(basePath())
	.use(resolveUrls())
	.use(slugify_urls())
	.use(date())
	.use(
		favicon({
			input: '/assets/icons/Mask_White_Stroke_Thicker_Favicon.svg',
		})
	)
	.use(metas())
	.use(
		feed({
			output: '/feed.rss',
			query: 'type=post',
			sort: 'date=desc',
			info: {
				title: '=site.title',
				description: '=site.description',
				lang: 'en',
				generator: true,
				authorName: 'Waxlimbs',
				authorUrl: 'https://waxlimbs.com',
			},
			items: {
				title: '=title',
				description: '=excerpt',
				published: '=date',
				image: '=cover',
				content: '=children',
				authorName: '=author',
			},
		})
	)
	.use(sitemap())
	.use(extractOrder())
	.use(
		toc({
			anchor: false,
		})
	);

site.add('/assets').add('/uploads');

site.process(['.html'], (pages) => {
	for (const page of pages) {
		// Mark all external links
		const externalLinks = page.document.querySelectorAll('a[href^="http"]');
		externalLinks.forEach((link) => {
			link.classList.add('external');
			link.setAttribute('target', '_blank');
		});

		// Set social icons
		const socialIcons = page.document.querySelectorAll('.social-icon');
		for (const icon of socialIcons) {
			page.document
				.querySelectorAll(
					'[data-icon=' +
						'"' +
						`${icon.getAttribute('data-icon')}` +
						'"]'
				)
				.forEach((icon) => {
					(icon as HTMLElement).setAttribute(
						'style',
						`mask: var(--icon-${icon.getAttribute('data-icon')?.toLowerCase()})`
					);
				});
		}
	}
});

export default site;
