// Usage: node generate-project-json.mjs [outputPath]
// Defaults to "./dist/projects.json"

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { globSync } from "glob";
import { load } from "js-yaml";
import { getCorrectLanguageName } from "./languageUtils.mjs";
import { sanitizeUrl } from "./sanitizeUrl.mjs";

const yamls = globSync("./projects/*/*.yaml").sort();
const allScreenshots = globSync(
  "./projects/*/screenshots/*.{png,jpg,jpeg}"
).sort();

/** @type {import('./types').Project[]} */
const projects = yamls.map((path) => {
  const yaml = readFileSync(path, "utf8");
  const parsedYaml = /** @type {import('./types').Project} */ (load(yaml));
  const screenshotsPath = path.replace(/\/[^/]*?\.yaml$/, "/screenshots");
  parsedYaml.screenshots = allScreenshots
    .filter((screenshotPath) => screenshotPath.startsWith(screenshotsPath))
    .map((screenshotPath) => "/" + screenshotPath);
  parsedYaml.languages = parsedYaml.languages.map(getCorrectLanguageName);
  parsedYaml.license = parsedYaml.license || "Unspecified";
  const folderName = path.split("/").slice(-2, -1)[0];
  parsedYaml.slug = folderName;

  parsedYaml.codeUrl = sanitizeUrl(parsedYaml.codeUrl);
  parsedYaml.demoUrl = parsedYaml.demoUrl
    ? sanitizeUrl(parsedYaml.demoUrl)
    : null;

  if (parsedYaml.authors) {
    parsedYaml.authors = parsedYaml.authors.map((t) => ({
      [Object.keys(t)[0]]: sanitizeUrl(Object.values(t)[0]),
    }));
  }

  if (parsedYaml.tutorials) {
    parsedYaml.tutorials = parsedYaml.tutorials.filter((t) =>
      sanitizeUrl(Object.values(t)[0])
    );
  }

  return parsedYaml;
});

const outputPath = process.argv[2] || "./dist/projects.json";
const outputDir = outputPath.split("/").slice(0, -1).join("/");
if (outputDir) {
  mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputPath, JSON.stringify(projects, null, 4), "utf8");
