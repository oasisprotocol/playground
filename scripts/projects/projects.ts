import fs from 'fs';
import {Project} from "../../src/types";
import { dump, load } from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Importer } from "./Importer";
import { GithubImporter } from "./GithubImporter";
import { DoraHacksImporter } from "./DoraHacksImporter";
import { EthGlobalImporter } from "./EthGlobalImporter";

const registeredImporters: Map<RegExp, Importer> = new Map();
registeredImporters.set(/github\.com/i, new GithubImporter());
registeredImporters.set(/dorahacks\.io/i, new DoraHacksImporter());
registeredImporters.set(/ethglobal\.com/i, new EthGlobalImporter());

const [,, command, ...args] = process.argv;

function loadProjects(): Map<string, Project> {
    try {
        const projectsPath = dirname(fileURLToPath(import.meta.url))+'/../../projects';
        return new Map(
            fs.readdirSync(projectsPath)
                .filter(dir => dir !== '.template')
                .map(dir => [
                    dir,
                    load(fs.readFileSync(`${projectsPath}/${dir}/description.yaml`, 'utf8')) as Project
                ])
        );
    } catch (error) {
        console.error('Error loading projects:', error);
        return new Map();
    }
}

switch (command) {
    case 'add':
        if (args.length < 1) {
            console.error('Usage: add <url> [directory]');
            process.exit(1);
        }
        const [url, directory] = args;

        let matched=false;
        for (const [regex, importer] of registeredImporters) {
            if (url.match(regex)) {
                const project = await importer.importFromUrl(url);
                const projectsPath = dirname(fileURLToPath(import.meta.url))+'/../../projects';
                let projectDir = `${projectsPath}/` + (directory || project.slug);

                if (fs.existsSync(projectDir)) {
                    let i = 1;
                    while (fs.existsSync(projectDir+`-${i}`)) {
                        i++;
                    }
                    projectDir += `-${i}`;
                    project.slug += `-${i}`;
                }
                fs.mkdirSync(projectDir, { recursive: true });
                console.log(project);
                const yamlContent = dump(project);
                fs.writeFileSync(`${projectDir}/description.yaml`, yamlContent, 'utf8');
                console.log(`Imported project "${project.name}" to ${projectDir}`);
                matched = true;
                break;
            }
        }

        if (!matched) {
            console.error(`No importer found for URL: ${url}. Available importers:`);
            console.log(registeredImporters);
            process.exit(1);
        }

        break;

    case 'update':
        // TODO
        //const existingProjects = loadProjects();
        break;

    case 'dump':
        const outputFile = args[0] === '-o' && args[1] ? args[1] : 'projects.json';
        const allProjects = loadProjects();
        fs.writeFileSync(outputFile, JSON.stringify(Object.fromEntries(allProjects), null, 2));
        console.log(`${allProjects.size} projects written to ${outputFile}`);
        break;

    default:
        console.log(`Available commands:
  add <url> <name>
    Import a new project living on url with the specified name
    
  update
    Check existing projects and update them
    
  dump [-o output_file]
    Dump all projects to JSON format
    Default output is 'projects.json'
    Use -o flag to specify a different output file
  `);
        process.exit(1);
}