import { JSDOM } from 'jsdom';
import { Project } from '../../src/types';
import { GithubImporter } from './GithubImporter';
import { Importer, detectParatimes, detectTags } from './Importer';

export class EthGlobalImporter implements Importer {
  async importFromUrl(projectUrl: string): Promise<Project> {
    const projectUrlPath = projectUrl.split('/');
    const projectId = projectUrlPath[projectUrlPath.length - 1];

    const dom: JSDOM = await JSDOM.fromURL(projectUrl);
    const document: Document = dom.window.document;

    const h1Name = document.getElementsByTagName('h1');
    const name = h1Name.length > 0 ? h1Name[0].textContent : projectId;
    const summary: string = h1Name[0]?.nextElementSibling?.textContent || '';

    const h3description: HTMLHeadingElement | undefined = Array.from(
      document.getElementsByTagName('h3'),
    ).find(
      (el: HTMLHeadingElement): boolean =>
        el.textContent === 'Project Description',
    );
    const projectDescription: string =
      h3description?.nextElementSibling?.textContent || '';
    const howItsMade: string =
      h3description?.nextElementSibling?.nextElementSibling?.nextElementSibling
        ?.textContent || '';

    const demoUrlElement = Array.from(document.getElementsByTagName('a')).find(
      (el: HTMLAnchorElement): boolean => el.textContent?.includes('Live Demo'),
    );
    const demoUrl = demoUrlElement?.href || '';

    const codeUrlElement = Array.from(document.getElementsByTagName('a')).find(
      (el: HTMLAnchorElement): boolean =>
        el.textContent?.includes('Source Code'),
    );
    const codeUrl = codeUrlElement?.href || '';
    const maintainedByOasis = codeUrl.includes('oasisprotocol');

    const swiperSlides = Array.from(
      document.getElementsByClassName('swiper-slide'),
    );
    const screenshots = swiperSlides
      .map((slide) => slide.getElementsByTagName('img')[0]?.src)
      .filter((src) => src);
    let videoTutorial = undefined;

    const scriptTags = document.getElementsByTagName('script');
    for (const script of scriptTags) {
      const content = script.textContent || '';

      const match = content.match(/\\"muxUrl\\":\\"([^\"]*)\\\"/);
      if (match) {
        console.log('video tutorials');
        videoTutorial = match[1];
        break;
      }
    }
    const tutorials = videoTutorial ? [{ 'Video demo': videoTutorial }] : [];

    const description = `${summary}\n\n${projectDescription}\n\n${howItsMade}\n\nCheck·out·more·on·the·hackathon's·[project·page](${projectUrl}).`;

    const tags: string[] = detectTags(description);
    const h3createdAt: HTMLHeadingElement | undefined = Array.from(
      document.getElementsByTagName('h3'),
    ).find(
      (el: HTMLHeadingElement): boolean => el.textContent === 'Created At',
    );
    const hackathonName =
      h3createdAt?.nextElementSibling?.querySelector('div')?.textContent || '';
    tags.push(hackathonName);
    tags.push('Hackathon');

    const paratimes: string[] = detectParatimes(description);

    let ghProject: Project = undefined;
    if (codeUrl) {
      const ghi = new GithubImporter();
      ghProject = await ghi.importFromUrl(codeUrl);
    }

    return {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      authors: ghProject ? ghProject.authors : [],
      description,
      screenshots,
      paratimes,
      codeUrl,
      tutorials,
      demoUrl,
      created: ghProject ? ghProject.created : new Date(),
      lastUpdated: ghProject ? ghProject.lastUpdated : new Date(),
      license: ghProject ? ghProject.license : '',
      tags,
      languages: ghProject ? ghProject.languages : [],
      maintainedByOasis,
    };
  }
}
