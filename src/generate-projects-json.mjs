import { load } from 'js-yaml';
import { globSync } from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { getCorrectLanguageName } from './languageUtils.mjs';

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

  return parsedYaml;
});

writeFileSync(
  './public/projects.json',
  JSON.stringify(projects, null, 4),
  'utf8',
);
