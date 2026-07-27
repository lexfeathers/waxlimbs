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
import footnote from 'npm:markdown-it-footnote@latest';
import implicitFigures from 'npm:markdown-it-image-figures@latest';
import resolveUrls from 'lume/plugins/resolve_urls.ts';
import toc from 'lume/plugins/toc.ts';

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
		location: new URL('localhost:3000'),
	},
	{
		markdown,
	}
);

site.use(
		icons({
			folder: '/assets/icons',
		})
	)
	.use(esbuild())
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

site.add('/assets')
	.add('/uploads');

// Mark all external links
site.process([".html"], (pages) => {
	for (const page of pages) {
		const externalLinks = page.document.querySelectorAll('a[href^="http"]');
		
		externalLinks.forEach((link) => {
			link.classList.add('external');
			link.setAttribute('_target', '_blank');
		});
	}
});

export default site;
