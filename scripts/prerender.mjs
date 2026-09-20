// Static-site generation. Runs after both Vite builds
// (`vite build` for the browser bundle, `vite build --ssr` for the render
// function below), turning the single index.html shell into one real HTML
// file per route, each carrying that page's actual text and its own head
// tags. Without this, a crawler that does not execute JavaScript — which is
// most AI answer-engine fetchers — only ever sees an empty <div id="root">.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { staticRoutes } from '../src/routes.js';
import { render } from '../dist/server/entry-server.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const clientDir = path.join(rootDir, 'dist/client');
const template = await readFile(path.join(clientDir, 'index.html'), 'utf-8');

// <title>, <meta> and <link> are hoistable: React moves them into <head> in
// the browser no matter where they are rendered. renderToString has no head
// to move them into, so it leaves them inline in the markup, and hydration
// then fails on every page — the server put them in #root, the client expects
// them in <head>. Moving them here is what makes the two agree.
//
// Text content is escaped by React, and an attribute value cannot hold a raw
// '<', so nothing in the page copy can look like a tag to this.
const HOISTABLE = /<title[^>]*>.*?<\/title>|<(?:meta|link)\b[^>]*\/?>/gs;

function splitHoistable(markup) {
  const head = markup.match(HOISTABLE) ?? [];
  return { head: head.join('\n    '), body: markup.replace(HOISTABLE, '') };
}

async function renderRoute(url, outputFile) {
  const { head, body } = splitHoistable(render(url));
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', body);

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
