import { Project } from './types'
import { load } from "js-yaml";

type ParsedYAML = Project

const yamls = import.meta.glob('../projects/*/*.yaml', { as: 'raw', eager: true });
const allScreenshots = import.meta.glob('../projects/*/screenshots/*.png', {as: 'url', eager: true});

export const projects: Project[] = Object.entries(yamls).map(([path, yaml]) => {

  const parsedYaml = load(yaml) as ParsedYAML; 
   const screenshotsPath = path.replace(/\/[^/]*?\.yaml$/, '/screenshots' )
   parsedYaml.screenshots = Object.entries(allScreenshots).filter(([screenshotPath]) => screenshotPath.startsWith(screenshotsPath)).map(([_screenshotPath, screenshotUrl]) => screenshotUrl)
  return parsedYaml as Project;
});

