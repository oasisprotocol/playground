/** Blocks dangerous URLs that start with "javascript:". */
export function sanitizeUrl(url: string) {
  try {
    if (new URL(url).protocol !== 'https:') {
      console.error('Blocked unsafe URL:', url);
      return undefined;
    }
  } catch (err) {
    console.error('Blocked broken URL:', url);
    return undefined;
  }
  return url;
}
