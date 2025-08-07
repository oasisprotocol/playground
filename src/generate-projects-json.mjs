import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { load } from 'js-yaml';
import { getCorrectLanguageName } from './languageUtils.mjs';
import { sanitizeUrl } from './sanitizeUrl.mjs';

const yamls = globSync('./projects/*/*.yaml').sort();
const allScreenshots = globSync(
  './projects/*/screenshots/*.{png,jpg,jpeg}',
).sort();

/** @param {string | undefined} license */
const formatLicense = (license) => {
  if (!license) return 'Unspecified';
  if (license.toLowerCase() === 'mit') return 'MIT License';
  if (license.toLowerCase() === 'apache-2.0') return 'Apache License 2.0';
  if (license.toLowerCase() === 'gpl-3.0') return 'GNU General Public License v3.0';
  if (license.toLowerCase() === 'bsd-3-clause') return 'BSD 3-Clause License';
  return license;
};

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

  // Fix URL sanitization to handle undefined/empty values
  parsedYaml.codeUrl = parsedYaml.codeUrl && parsedYaml.codeUrl.trim()
    ? sanitizeUrl(parsedYaml.codeUrl)
    : '';
  parsedYaml.demoUrl = parsedYaml.demoUrl && parsedYaml.demoUrl.trim()
    ? sanitizeUrl(parsedYaml.demoUrl)
    : null;
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
  parsedYaml.license = formatLicense(parsedYaml.license);

  return parsedYaml;
});

writeFileSync(
  './public/projects.json',
  JSON.stringify(projects, null, 4),
  'utf8',
);
