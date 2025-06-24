import { JSDOM } from 'jsdom';
import { Project } from '../../src/types';
import { GithubImporter } from './GithubImporter';
import { Importer, detectParatimes, detectTags } from './Importer';

export class TaikaiImporter implements Importer {
  async importFromUrl(projectUrl: string): Promise<Project> {
    console.log('Fetching URL:', projectUrl);
    const projectUrlPath = projectUrl.split('/');
    const projectId = projectUrlPath[projectUrlPath.length - 1];

    const dom: JSDOM = await JSDOM.fromURL(projectUrl);
    const document: Document = dom.window.document;
    console.log('Document loaded, title:', document.title);

    // Get project name from h1.
    const nameElement = document.querySelector('h1');
    const name = nameElement?.textContent?.trim() || projectId;

    // Get GitHub URL from the GitHub button or description text.
    const githubButton = document.querySelector('a[href*="github.com"]') as HTMLAnchorElement;
    let codeUrl = githubButton?.href || '';
    
    // If no GitHub button found, search for GitHub URLs in the text content
    if (!codeUrl) {
      const allText = document.body.textContent || '';
      const githubUrlMatch = allText.match(/https?:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+/i);
      if (githubUrlMatch) {
        codeUrl = githubUrlMatch[0];
      }
    }
    
    // Prune the GitHub URL to get just the base repository URL
    if (codeUrl) {
      // Remove anything after the repo name (like /tree/main, /blob/main, etc.)
      codeUrl = codeUrl.replace(/\/(tree|blob|commits?)\/.*$/, '');
      // Also remove trailing slash if present
      codeUrl = codeUrl.replace(/\/$/, '');
    }

    // Get team members. TODO: Need headless browser to load dynamic content (buttons and attachments).
    const teamHeading = Array.from(document.querySelectorAll('h3')).find(h3 => h3.textContent?.trim() === 'Team');
    console.log('Found team heading:', teamHeading?.textContent);
    const teamList = teamHeading?.nextElementSibling?.querySelector('ul');
    console.log('Found team list:', teamList?.innerHTML);
    const authors: { [key: string]: string }[] = [];
    if (teamList) {
      const teamMembers = teamList.querySelectorAll('li');
      console.log('Found team members:', teamMembers.length);
      for (const member of Array.from(teamMembers)) {
        const nameElement = member.querySelector('span');
        const name = nameElement?.textContent?.trim();
        console.log('Processing team member:', name);
        if (name) {
          // Get their Taikai profile URL.
          const profileLink = (member.querySelector('a') as HTMLAnchorElement)?.href;
          console.log('Found profile link:', profileLink);
          authors.push({
            [name]: profileLink || ''
          });
        }
      }
    }
    console.log('Final authors array:', authors);

    // Get project description - extract content and convert HTML to markdown.
    const descriptionDiv = document.querySelector('div.fr-view');
    let description = '';

    // Get all text content for later use.
    const allText = document.body.textContent || '';
    
    if (descriptionDiv) {
      // Get all paragraphs from the description div.
      const paragraphs = descriptionDiv.querySelectorAll('p');
      let descriptionParts: string[] = [];
      
      for (const p of Array.from(paragraphs)) {
        const text = p.textContent?.trim();
        if (!text) continue;
        
        // Skip metadata paragraphs.
        if (text.startsWith('Repository:') || 
            text.startsWith('Video:') || 
            text.startsWith('Contact:') ||
            text.startsWith('Discord:') ||
            text.startsWith('Telegram:')) {
          continue;
        }
        
        // Keep the original HTML content, just convert basic formatting.
        let content = p.innerHTML
          .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<em>(.*?)<\/em>/gi, '*$1*')
          .replace(/<br\s*\/?>/gi, '\n');
        
        if (content) {
          descriptionParts.push(content);
        }
      }
      
      description = descriptionParts.join('\n\n');
    }
    
    // Fallback if we can't find the description div.
    if (!description) {
      const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.textContent?.trim()).filter(Boolean);
      description = paragraphs.find(p => p && p.length > 50) || name;
    }

    // Add the hackathon project page link at the end.
    description += `\n\nCheck out more on the hackathon's [project page](${projectUrl}).`;

    // Extract video URL - be more specific about YouTube URL format.
    const videoMatch = allText.match(/Video:\s*(https:\/\/youtu\.be\/[\w\-]+)/i) ||
                      allText.match(/(https:\/\/youtu\.be\/[\w\-]+)/i);
    let videoTutorial = '';
    if (videoMatch) {
      videoTutorial = videoMatch[1].replace(/[^a-zA-Z0-9\-\.:\/]/g, '');
      videoTutorial = videoTutorial.split(/(?:\s|\(|Contact)/i)[0];
    }
    const tutorials = videoTutorial ? [{ 'Video demo': videoTutorial }] : [];

    // Get demo URL - look for actual demo links, not just any link.
    const demoUrlElement = Array.from(document.querySelectorAll('a')).find(
      (el: HTMLAnchorElement): boolean => {
        const text = el.textContent?.toLowerCase() || '';
        const href = el.href?.toLowerCase() || '';
        return (text.includes('demo') || text.includes('live') || text.includes('play')) && 
               !href.includes('garden.taikai.network') && 
               !href.includes('github.com') &&
               !href.includes('youtu');
      }
    );
    const demoUrl = demoUrlElement?.href || '';

    // Get screenshots from both description and attachments.
    const screenshots: string[] = [];

    // Get images from description.
    const descriptionImages = document.querySelectorAll('img');
    console.log('Found description images:', descriptionImages.length);
    Array.from(descriptionImages).forEach(img => {
      const src = img.getAttribute('src');
      console.log('Description image src:', src);
      if (src) screenshots.push(src);
    });

    // TODO: Need headless browser to work properly.
    // // Get images from attachments section.
    // const attachmentsHeading = Array.from(document.querySelectorAll('h3')).find(h3 => h3.textContent?.trim() === 'Attachments');
    // console.log('Found attachments heading:', attachmentsHeading?.textContent);
    // const attachmentsDiv = attachmentsHeading?.parentElement;
    // console.log('Found attachments container:', attachmentsDiv?.outerHTML);

    // // Search entire document for storage.googleapis.com links
    // const allLinks = document.querySelectorAll('a[href*="storage.googleapis.com"]');
    // console.log('Found storage.googleapis.com links in entire document:', allLinks.length);
    // Array.from(allLinks).forEach((link, index) => {
    //   console.log(`Link ${index + 1}:`, {
    //     href: (link as HTMLAnchorElement).href,
    //     text: link.textContent,
    //     parentHTML: link.parentElement?.outerHTML
    //   });
    // });


    console.log('Final screenshots array:', screenshots);

    // Get hackathon name from URL path.
    const hackathonMatch = projectUrl.match(/\/hackathons\/([^\/]+)\//);
    const hackathonName = hackathonMatch ? hackathonMatch[1] : 'Taikai Hackathon';

    // Detect tags and paratimes.
    const tags: string[] = detectTags(description + ' ' + allText);
    tags.push(hackathonName);
    tags.push('Hackathon');

    const paratimes: string[] = detectParatimes(description + ' ' + allText);

    // Try to get GitHub project info if available.
    let ghProject: Project | undefined = undefined;
    if (codeUrl) {
      try {
        const ghi = new GithubImporter();
        ghProject = await ghi.importFromUrl(codeUrl);
      } catch (error) {
        console.warn('Failed to import GitHub project:', error);
      }
    }

    return {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      authors,
      description,
      screenshots: screenshots,
      paratimes,
      codeUrl,
      tutorials,
      demoUrl,
      created: ghProject ? ghProject.created : new Date().toISOString(),
      lastUpdated: ghProject ? ghProject.lastUpdated : new Date().toISOString(),
      license: ghProject ? ghProject.license : '',
      tags,
      languages: ghProject ? ghProject.languages : [],
      maintainedByOasis: codeUrl.includes('oasisprotocol'),
    };
  }
} 