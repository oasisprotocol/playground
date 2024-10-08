import { load } from 'js-yaml';
import { getCorrectLanguageName } from './languageUtils';
import type { Project } from './types';

const yamls = import.meta.glob('../projects/*/*.yaml', {
  as: 'raw',
  eager: true,
});
const allScreenshots = import.meta.glob(
  '../projects/*/screenshots/*.(png|jpg|jpeg)',
  { as: 'url', eager: true },
);

export const projects: Project[] = Object.entries(yamls).map(([path, yaml]) => {
  const parsedYaml = load(yaml) as Project;
  const screenshotsPath = path.replace(/\/[^/]*?\.yaml$/, '/screenshots');
  parsedYaml.screenshots = Object.entries(allScreenshots)
    .filter(([screenshotPath]) => screenshotPath.startsWith(screenshotsPath))
    .map(([_screenshotPath, screenshotUrl]) => screenshotUrl);
  parsedYaml.languages = parsedYaml.languages.map(getCorrectLanguageName);
  const folderName = path.split('/').slice(-2, -1)[0];
  parsedYaml.slug = folderName;

  return parsedYaml;
});
