import { Project } from '../../src/types';

export interface Importer {
  importFromUrl(url: string): Promise<Project>;
}

// Extract tags from the project description.
export function detectTags(description: string): string[] {
  const tags: string[] = [];
  if (/rofl/i.test(description)) {
    tags.push('ROFL');
  }
  if (/rng/i.test(description)) {
    tags.push('RNG');
  }
  if (/health/i.test(description)) {
    tags.push('Health');
  }
  if (/game/i.test(description)) {
    tags.push('Gaming');
  }
  if (/React/g.test(description)) {
    tags.push('React');
  }
  if (/telegram/i.test(description)) {
    tags.push('Telegram');
  }
  if (/next\.js/i.test(description)) {
    tags.push('Next.js');
  }
  if (/wagmi/i.test(description)) {
    tags.push('Wagmi');
  }

  return tags;
}

// Extract ParaTimes from the project description.
export function detectParatimes(description: string): string[] {
  const paratimes: string[] = [];
  if (/sapphire/i.test(description)) {
    paratimes.push('sapphire');
  }

  return paratimes;
}
