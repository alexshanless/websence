// Static-site generation. Runs after both Vite builds
// (`vite build` for the browser bundle, `vite build --ssr` for the render
// function below), turning the single index.html shell into one real HTML
// file per route, each carrying that page's actual text and its own head
// tags. Without this, a crawler that does not run JavaScript — which is most
// AI answer-engine fetchers — only ever sees an empty <div id="root">.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { staticRoutes } from '../src/routes.js';
import { render } from '../dist/server/entry-server.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const clientDir = path.join(rootDir, 'dist/client');
const template = await readFile(path.join(clientDir, 'index.html'), 'utf-8');

function headTagsFor(helmet) {
  if (!helmet) {
    return '';
  }
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');
}

async function renderRoute(url, outputFile) {
  const { html, helmet } = render(url);
  const page = template
    .replace('<!--app-head-->', headTagsFor(helmet))
    .replace('<!--app-html-->', html);

  const outputPath = path.join(clientDir, outputFile);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, page);
  console.log(`prerendered ${url} -> dist/client/${outputFile}`);
}

for (const url of staticRoutes) {
  const outputFile = url === '/' ? 'index.html' : `${url.slice(1)}/index.html`;
  await renderRoute(url, outputFile);
}

// Netlify serves this file automatically for any path that has no matching
// static file, with a real 404 status — no redirect rule needed. The
// StaticRouter's catch-all route renders NotFoundPage for any URL that does
// not match a real route, so any unmatched path works here.
await renderRoute('/this-page-does-not-exist', '404.html');

// Build-time only. Netlify would otherwise publish it alongside the site.
await rm(path.join(rootDir, 'dist/server'), { recursive: true, force: true });
