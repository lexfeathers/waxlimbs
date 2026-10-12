import lume from 'lume/mod.ts';
import icons from 'lume/plugins/icons.ts';
import esbuild from 'lume/plugins/esbuild.ts';
import slugify_urls from 'lume/plugins/slugify_urls.ts';
import favicon from 'lume/plugins/favicon.ts';
import metas from 'lume/plugins/metas.ts';
import feed from 'lume/plugins/feed.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import date from 'lume/plugins/date.ts';
import extractOrder from 'lume/plugins/extract_order.ts';
import basePath from 'lume/plugins/base_path.ts';
import footnote from 'npm:markdown-it-footnote@4.0.0';
import implicitFigures from 'npm:markdown-it-image-figures@2.1.1';
import resolveUrls from 'lume/plugins/resolve_urls.ts';
import toc from 'lume/plugins/toc.ts';
import { v4 as uuidv4 } from 'npm:uuid@14.0.3';

// Pass options to markdown-it plugins
const markdown = {
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
};

const site = lume(
	{
		src: './src',
		location: new URL('https://waxlimbs.com'),
	},
	{
		markdown,
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
