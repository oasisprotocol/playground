import {Importer} from './Importer';
import {GithubImporter} from './GithubImporter';
import {Project} from "../../src/types";

export class DoraHacksImporter implements Importer {
  async importFromUrl(projectUrl: string): Promise<Project> {
    const urlParts = projectUrl.replace(/\/$/, '').split('/');
    const projectId = urlParts[urlParts.length - 1];
    const apiResponse = await fetch(`https://dorahacks.io/api/hack-list/projects/${projectId}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0'
      }
    });

    const projectData = await apiResponse.json();

    let slug = '';
    let repoInfo = {};
    let languages: string[] = [];
    let license: string;

    const tutorials = [{"Video tutorial": projectData.demo_video}];
    const codeUrl = projectData.github_page;
    const maintainedByOasis = codeUrl.includes('oasisprotocol')
    const demoUrl = projectData.demo_link;

    if (codeUrl) {
      const ghi = new GithubImporter();
      repoInfo = await ghi.repoInfo(codeUrl);
      slug = repoInfo.name.toLowerCase();
      languages = await ghi.repoLanguages(codeUrl);
      if (repoInfo.license) {
        license = repoInfo.license.key;
      }
    }

    let authors: { [name: string]: string }[] = [];
    if (maintainedByOasis) {
      authors.push({"Oasis Protocol Foundation": "https://oasisprotocol.org"})
    } else {
      authors = [{[projectData.owner_info.nick_name]: projectData.owner_info.website ?? `https://dorahacks.io/hacker/${projectData.owner_info.username}`}];
      for (let i=0; i<projectData.project_members.length; i++) {
        const d = projectData.project_members[i].member;
        authors.push({[d.nick_name]: (d.website ?? `https://dorahacks.io/hacker/${d.username}`)});
      }
    }

    return {
        name: projectData.name,
        slug,
        authors,
        description: projectData.project_description + `\n\nCheck out more on the hackathon's [project page](${projectUrl}).`,
        screenshots: projectData.pictures,
        paratimes: ['sapphire'],
        codeUrl,
        tutorials,
        demoUrl,
        created: repoInfo.created_at || '',
        lastUpdated: repoInfo.updated_at || '',
        license: license ?? '',
        tags: [],
        languages,
        maintainedByOasis,
    };
  }
}
