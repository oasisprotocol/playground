import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { load } from 'js-yaml';
import { getCorrectLanguageName } from './languageUtils.mjs';
import { sanitizeUrl } from './sanitizeUrl.ts';

const yamls = globSync('./projects/*/*.yaml').sort();
const allScreenshots = globSync(
  './projects/*/screenshots/*.{png,jpg,jpeg}',
).sort();

/** @type {import('./types').Project[]} */
const projects = yamls.map((path) => {
  const yaml = readFileSync(path, 'utf8');
  const parsedYaml = /** @type {import('./types').Project} */ (load(yaml));
  const screenshotsPath = path.replace(/\/[^/]*?\.yaml$/, '/screenshots');
  parsedYaml.screenshots = allScreenshots
    .filter((screenshotPath) => screenshotPath.startsWith(screenshotsPath))
    .map((screenshotPath) => '/' + screenshotPath);
  parsedYaml.languages = parsedYaml.languages.map(getCorrectLanguageName);
  const folderName = path.split('/').slice(-2, -1)[0];
  parsedYaml.slug = folderName;

  parsedYaml.codeUrl = sanitizeUrl(parsedYaml.codeUrl);
  if (parsedYaml.demoUrl) {
    parsedYaml.demoUrl = sanitizeUrl(parsedYaml.demoUrl);
  }
  if (parsedYaml.authors) {
    parsedYaml.authors = parsedYaml.authors.map((t) => ({
      [Object.keys(t)[0]]: sanitizeUrl(Object.values(t)[0]),
    }));
  }
  if (parsedYaml.tutorials) {
    parsedYaml.tutorials = parsedYaml.tutorials.filter((t) =>
      sanitizeUrl(Object.values(t)[0]),
    );
  }

  return parsedYaml;
});

writeFileSync(
  './public/projects.json',
  JSON.stringify(projects, null, 4),
  'utf8',
);
