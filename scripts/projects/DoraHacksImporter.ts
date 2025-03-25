import { Project } from '../../src/types';
import { GithubImporter } from './GithubImporter';
import { Importer, detectParatimes, detectTags } from './Importer';

export class DoraHacksImporter implements Importer {
  async importFromUrl(projectUrl: string): Promise<Project> {
    const urlParts = projectUrl.replace(/\/$/, '').split('/');
    const projectId = urlParts[urlParts.length - 1];
    const apiResponse = await fetch(
      `https://dorahacks.io/api/hack-list/projects/${projectId}/`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0',
        },
      },
    );

    const projectData = await apiResponse.json();

    let ghProject: Project = undefined;
    let authors: { [name: string]: string }[] = [];
    const slug = projectData.name.toLowerCase().replace(/\s+/g, '-');
    let languages: string[] = [];

    const tutorials = [{ 'Video demo': projectData.demo_video }];
    const codeUrl = projectData.github_page;
    const maintainedByOasis = codeUrl.includes('oasisprotocol');
    const demoUrl = projectData.demo_link;

    if (codeUrl) {
      const ghi = new GithubImporter();
      ghProject = await ghi.importFromUrl(codeUrl);
      languages = ghProject.languages;
    }

    if (maintainedByOasis) {
      authors = [{ 'Oasis Protocol Foundation': 'https://oasisprotocol.org' }];
    } else {
      authors = [
        {
          [projectData.owner_info.nick_name]:
            projectData.owner_info.website ??
            `https://dorahacks.io/hacker/${projectData.owner_info.username}`,
        },
      ];
      for (let i = 0; i < projectData.project_members.length; i++) {
        const d = projectData.project_members[i].member;
        authors.push({
          [d.nick_name]:
            d.website ?? `https://dorahacks.io/hacker/${d.username}`,
        });
      }
      if (ghProject) {
        authors = [...authors, ...ghProject.authors];
      }
    }

    let screenshots = projectData.pictures;
    // Match ![some title](some_path_to_image.jpg).
    const markdownImageMatches =
      projectData.project_description.match(
        /!\[.*\]\((.*\.(jpg|jpeg|png|JPG|JPEG|PNG))\)/g,
      ) || [];
    const markdownImages = markdownImageMatches
      .map((match) => {
        const urlMatch = match.match(/\((.*?\.(jpg|jpeg|png|JPG|JPEG|PNG))\)/);
        return urlMatch ? urlMatch[1] : null;
      })
      .filter((url) => url);
    screenshots = [...screenshots, ...markdownImages];

    const tags = detectTags(projectData.project_description);
    if (
      projectData.hackathon_projects &&
      Array.isArray(projectData.hackathon_projects)
    ) {
      projectData.hackathon_projects.forEach((h) => {
        if (h.hackathon.uname) {
          tags.push(h.hackathon.uname);
        }
      });
      tags.push('Hackathon');
    }

    const paratimes = detectParatimes(projectData.project_description);

    return {
      name: projectData.name,
      slug,
      authors,
      description: `${projectData.vision}\n\n${projectData.project_description}\n\nCheck·out·more·on·the·hackathon's·[project·page](${projectUrl}).`,
      screenshots,
      paratimes,
      codeUrl,
      tutorials,
      demoUrl,
      created: ghProject ? ghProject.created : new Date().toISOString(),
      lastUpdated: ghProject ? ghProject.lastUpdated : new Date().toISOString(),
      license: ghProject ? ghProject.license : '',
      tags,
      languages,
      maintainedByOasis,
    };
  }
}
