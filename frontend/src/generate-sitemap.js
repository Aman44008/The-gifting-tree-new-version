const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const hostname = 'http://localhost:3000/';
const routes = [
  '/',
  '/gifts',
  '/decoration',
  '/logo',
  '/product',
  '/:productId',
  '/cart',
  '/login',
  '/checkout',
  '/cancle',
];

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname });

  const writeStream = createWriteStream(resolve(__dirname, '../public/sitemap.xml'));
  sitemap.pipe(writeStream);

  routes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'daily', priority: 0.9 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('Sitemap generated successfully');
};

generateSitemap().catch(console.error);