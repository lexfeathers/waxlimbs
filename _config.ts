import lume from "lume/mod.ts";
import icons from "lume/plugins/icons.ts";
import esbuild from "lume/plugins/esbuild.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import feed from "lume/plugins/feed.ts";
import sitemap from "lume/plugins/sitemap.ts";
import date from "lume/plugins/date.ts";
import extractOrder from "lume/plugins/extract_order.ts";

const site = lume({
    src: "./src",
});

site.use(icons());
site.use(esbuild());
site.use(slugify_urls());
site.use(favicon({
    input: "/assets/icons/Mask_White.svg",
}));
site.use(metas());
site.use(feed());
site.use(sitemap());
site.use(date());
site.use(extractOrder());

site.add("/assets");

export default site;
