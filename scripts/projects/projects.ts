import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dump, load } from 'js-yaml';
import { Project } from '../../src/types';
import { DoraHacksImporter } from './DoraHacksImporter';
import { EthGlobalImporter } from './EthGlobalImporter';
import { GithubImporter } from './GithubImporter';
import { TaikaiImporter } from './TaikaiImporter';
import { Importer } from './Importer';

const registeredImporters: Map<RegExp, Importer> = new Map();
registeredImporters.set(/github\.com/i, new GithubImporter());
registeredImporters.set(/dorahacks\.io/i, new DoraHacksImporter());
registeredImporters.set(/ethglobal\.com/i, new EthGlobalImporter());
registeredImporters.set(/taikai\.network/i, new TaikaiImporter());

const [, , command, ...args] = process.argv;

function loadProjects(): Map<string, Project> {
  try {
    const projectsPath = `${dirname(fileURLToPath(import.meta.url))}/../../projects`;
    return new Map(
      fs
        .readdirSync(projectsPath)
        .filter((dir) => dir !== '.template')
        .map((dir) => [
          dir,
          load(
            fs.readFileSync(`${projectsPath}/${dir}/description.yaml`, 'utf8'),
          ) as Project,
        ]),
    );
  } catch (error) {
    console.error('Error loading projects:', error);
    return new Map();
  }
}

switch (command) {
  case 'add': {
    if (args.length < 1) {
      console.error('Usage: add <url> [directory]');
      process.exit(1);
    }
    const [url, directory] = args;

    const match = Array.from(registeredImporters.entries()).find(([regex, _]) =>
      regex.test(url),
    );
    if (!match) {
      console.error(`No importer found for URL: ${url}. Available importers:`);
      console.log(registeredImporters);
      process.exit(1);
    }
    const importer = match[1];

    const project = await importer.importFromUrl(url);
    const projectsPath =
      dirname(fileURLToPath(import.meta.url)) + '/../../projects';
    let projectDir = `${projectsPath}/${directory || project.slug}`;

    if (fs.existsSync(projectDir)) {
      let i = 1;
      while (fs.existsSync(`${projectDir}-${i}`)) {
        i++;
      }
      projectDir += `-${i}`;
      project.slug += `-${i}`;
    }
    fs.mkdirSync(projectDir, { recursive: true });

    // Don't store screenshots and slug in yaml.
    const screenshots = [...project.screenshots];
    delete project.screenshots;
    delete project.slug;

    // Description field multistring should be encoded with |. (https://github.com/nodeca/js-yaml/issues/171)
    let yamlContent = dump(project);
    yamlContent = yamlContent
      .replace(/\n{3,}/g, '\n\n')
      .replace(/description: >-/g, 'description: |');
    fs.writeFileSync(`${projectDir}/description.yaml`, yamlContent, 'utf8');

    if (screenshots && screenshots.length > 0) {
      const screenshotsDir = `${projectDir}/screenshots`;
      fs.mkdirSync(screenshotsDir, { recursive: true });
      for (const [index, url] of screenshots.entries()) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);

          // Better extension extraction for complex URLs
          const urlParts = url.split('/');
          const lastPart = urlParts[urlParts.length - 1];
          const extension = lastPart.includes('.') ? 
            lastPart.split('.').pop()?.toLowerCase() || 'jpg' : 
            'jpg';
          
          const paddedIndex = String(index + 1).padStart(2, '0');
          const filepath = `${screenshotsDir}/${paddedIndex}.${extension}`;

          const buffer = await response.arrayBuffer();
          fs.writeFileSync(filepath, Buffer.from(buffer));
        } catch (error) {
          console.warn(`Failed to download screenshot from ${url}:`, error);
        }
      }
    }

    console.log(`Imported project "${project.name}" to ${projectDir}`);
    break;
  }
  case 'dump': {
    const outputFile = args[0] === '-o' && args[1] ? args[1] : 'projects.json';
    const allProjects = loadProjects();
    fs.writeFileSync(
      outputFile,
      JSON.stringify(Object.fromEntries(allProjects), null, 2),
    );
    console.log(`${allProjects.size} projects written to ${outputFile}`);
    break;
  }
  default: {
    console.log(`Available commands:
  add <url> <name>
    Import a new project living on url with the specified name
    
  dump [-o output_file]
    Dump all projects to JSON format
    Default output is 'projects.json'
    Use -o flag to specify a different output file
  `);
    process.exit(1);
  }
}
