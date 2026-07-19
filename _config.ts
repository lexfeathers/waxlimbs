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

const site = lume({
	src: './src',
	location: new URL('https://lexfeathers.github.io/waxlimbs'),
});

site.use(
	icons({
		folder: '/assets/icons',
	})
);
site.use(esbuild());
site.use(slugify_urls());
site.use(
	favicon({
		input: '/assets/icons/Mask_White_Stroke_Thicker_Favicon.svg',
	})
);
site.use(metas());
site.use(
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
);
site.use(sitemap());
site.use(date());
site.use(extractOrder());
site.use(basePath());

site.add('/assets');
site.add('/uploads');

export default site;
