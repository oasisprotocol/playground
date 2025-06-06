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

    // Get project name from h1
    const nameElement = document.querySelector('h1');
    const name = nameElement?.textContent?.trim() || projectId;

    // Get project description - extract content and convert HTML to markdown
    const descriptionDiv = document.querySelector('div[class*="sc-"]') || document.querySelector('.xxmyC');
    let description = '';
    
    if (descriptionDiv) {
      // Get all paragraphs from the description div
      const paragraphs = descriptionDiv.querySelectorAll('p');
      let descriptionParts: string[] = [];
      
      for (const p of Array.from(paragraphs)) {
        const text = p.textContent?.trim();
        if (!text) continue;
        
        // Skip metadata paragraphs
        if (text.startsWith('Repository:') || 
            text.startsWith('Video:') || 
            text.startsWith('Contact:') ||
            text.startsWith('Discord:') ||
            text.startsWith('Telegram:')) {
          continue;
        }
        
        // Convert strong tags to markdown bold
        let content = p.innerHTML
          .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<em>(.*?)<\/em>/gi, '*$1*')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '') // Remove all other HTML tags
          .trim();
        
        if (content) {
          descriptionParts.push(content);
        }
      }
      
      description = descriptionParts.join('\n\n');
    }
    
    // Fallback if we can't find the description div
    if (!description) {
      const allText = document.body.textContent || '';
      const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.textContent?.trim()).filter(Boolean);
      description = paragraphs.find(p => p && p.length > 50) || name;
    }

    // Extract repository URL from text - be more specific about GitHub URL format
    const allText = document.body.textContent || '';
    const githubMatch = allText.match(/Repository:\s*(https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+)/i) || 
                       allText.match(/(https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+)/i);
    let codeUrl = '';
    if (githubMatch) {
      // Clean the URL to ensure it's just the repo URL
      codeUrl = githubMatch[1].replace(/[^a-zA-Z0-9\-\.:\/]/g, '');
      // Additional cleaning - remove anything after common patterns
      codeUrl = codeUrl.split(/(?:Video|Contact|Discord|Telegram)/i)[0];
      // Ensure it ends properly (no trailing punctuation except for valid URL chars)
      codeUrl = codeUrl.replace(/[^a-zA-Z0-9\-]$/, '');
    }
    const maintainedByOasis = codeUrl.includes('oasisprotocol');

    // Extract video URL - be more specific about YouTube URL format
    const videoMatch = allText.match(/Video:\s*(https:\/\/youtu\.be\/[\w\-]+)/i) ||
                      allText.match(/(https:\/\/youtu\.be\/[\w\-]+)/i);
    let videoTutorial = '';
    if (videoMatch) {
      videoTutorial = videoMatch[1].replace(/[^a-zA-Z0-9\-\.:\/]/g, '');
      videoTutorial = videoTutorial.split(/(?:\s|\(|Contact)/i)[0];
    }
    const tutorials = videoTutorial ? [{ 'Video demo': videoTutorial }] : [];

    // Get demo URL - look for actual demo links, not just any link
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

    // Get screenshots
    const allImages = document.querySelectorAll('img');
    const screenshots = Array.from(allImages)
      .map(img => img.getAttribute('src'))
      .filter((src): src is string => !!src && src.includes('taikai.azureedge.net'))
      .slice(0, 5); // Limit to first 5 screenshots

    // Get hackathon name from URL path
    const hackathonMatch = projectUrl.match(/\/hackathons\/([^\/]+)\//);
    const hackathonName = hackathonMatch ? hackathonMatch[1] : 'Taikai Hackathon';

    // Detect tags and paratimes
    const tags: string[] = detectTags(description + ' ' + allText);
    tags.push(hackathonName);
    tags.push('Hackathon');

    const paratimes: string[] = detectParatimes(description + ' ' + allText);

    // Try to get GitHub project info if available
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
      authors: ghProject ? ghProject.authors : [],
      description,
      screenshots,
      paratimes,
      codeUrl,
      tutorials,
      demoUrl,
      created: ghProject ? ghProject.created : new Date().toISOString(),
      lastUpdated: ghProject ? ghProject.lastUpdated : new Date().toISOString(),
      license: ghProject ? ghProject.license : '',
      tags,
      languages: ghProject ? ghProject.languages : [],
      maintainedByOasis,
    };
  }
} 