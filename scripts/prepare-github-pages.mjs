import { cp, mkdir, readdir, rename, rm } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const source = 'dist/client';
const destination = 'dist/github-pages';

async function collectHtml(directory, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collectHtml(path, files);
    else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html' && entry.name !== '404.html') files.push(path);
  }
  return files;
}

await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });

for (const file of await collectHtml(destination)) {
  const routeDirectory = file.slice(0, -'.html'.length);
  await mkdir(routeDirectory, { recursive: true });
  await rename(file, join(routeDirectory, 'index.html'));
}

console.log(`Prepared GitHub Pages files in ${relative('.', destination) || destination}.`);
