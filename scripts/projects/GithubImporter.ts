import { Project } from '../../src/types';
import { Importer, detectParatimes, detectTags } from './Importer';

export class GithubImporter implements Importer {
  async importFromUrl(url: string): Promise<Project> {
    const projectInfo = await this.repoInfo(url);

    const languages = await this.repoLanguages(url);
    let readme;
    try {
      readme = await this.repoReadme(url); // Try fetching readme, if it exists.
    } catch (error) {}
    const maintainedByOasis = url.includes('github.com/oasisprotocol');
    const authors: { [name: string]: string }[] = [];
    if (maintainedByOasis) {
      authors.push({
        'Oasis Protocol Foundation': 'https://oasisprotocol.org',
      });
    } else {
      const contributors = await this.repoContributors(url);
      for (let i = 0; i < contributors.length; i++) {
        authors.push({
          [(await contributors[i]).name]: (await contributors[i]).html_url,
        });
      }
    }

    return {
      authors,
      name: projectInfo.name
        .split('-')
        .join(' ')
        .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase()),
      slug: projectInfo.name.toLowerCase(),
      description: readme || '',
      languages: languages.map((lang) => lang.toLowerCase()),
      codeUrl: url,
      created: projectInfo.created_at,
      lastUpdated: projectInfo.updated_at,
      paratimes: detectParatimes(readme || ''),
      screenshots: [],
      license: projectInfo.license ? projectInfo.license.key : undefined,
      tags: detectTags(readme || ''),
      demoUrl: '',
      tutorials: [],
      maintainedByOasis,
    };
  }

  async repoContributors(url: string): Promise<{ [name: string]: string }[]> {
    const repoPath = new URL(url).pathname.slice(1);
    const contributorsUrl = `https://api.github.com/repos/${repoPath}/contributors`;

    try {
      const contributorsData = await this.fetchGithub(contributorsUrl);
      return contributorsData.map(async (contributor) => {
        const user = await this.fetchGithub(contributor.url);
        contributor.name = user.name || contributor.login;
        return contributor;
      });
    } catch (error) {
      throw new Error(
        `Failed to fetch repository contributors: ${error.message}`,
      );
    }
  }

  async repoLanguages(url: string): Promise<string[]> {
    const repoPath = new URL(url).pathname.slice(1);
    const languagesUrl = `https://api.github.com/repos/${repoPath}/languages`;
    const languagesData = await this.fetchGithub(languagesUrl);
    return Object.keys(languagesData);
  }

  async repoReadme(url: string): Promise<string> {
    const repoPath = new URL(url).pathname.slice(1);
    const readmeUrl = `https://api.github.com/repos/${repoPath}/readme`;
    const readmeData = await this.fetchGithub(readmeUrl);
    return Buffer.from(readmeData.content, 'base64').toString('utf-8');
  }

  async repoInfo(url: string): Promise<any> {
    const repoPath = new URL(url).pathname.slice(1);
    const apiUrl = `https://api.github.com/repos/${repoPath}`;
    return await this.fetchGithub(apiUrl);
  }

  async fetchGithub(url: string): Promise<any> {
    const headers: HeadersInit = {};
    if (process.env.API_KEY) {
      headers.Authorization = `Bearer ${process.env.API_KEY}`;
    }
    const requestOptions = {
      headers,
    };
    try {
      const repoResponse = await fetch(url, requestOptions);

      if (!repoResponse.ok) {
        throw new Error(`GitHub API request failed for ${url}`);
      }

      return await repoResponse.json();
    } catch (error) {
      throw new Error(
        `Failed to fetch repository information: ${error.message}`,
      );
    }
  }
}
