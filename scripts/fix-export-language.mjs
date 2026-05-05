import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await htmlFiles(path));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(path);
    }
  }

  return files;
}

const outDirectory = join(process.cwd(), "out");
const files = await htmlFiles(outDirectory);

for (const file of files) {
  let html = await readFile(file, "utf8");
  html = html.replaceAll("hrefLang=", "hreflang=");

  if (file.includes(`${join("out", "en")}${"/"}`) || file.endsWith(join("out", "en.html"))) {
    html = html.replace('<html lang="es-DO">', '<html lang="en">');
  }

  await writeFile(file, html);
}
