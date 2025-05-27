/** Blocks dangerous URLs that start with "javascript:". */
export function sanitizeUrl(url: string) {
  try {
    if (!['https:', 'http:'].includes(new URL(url).protocol)) {
      throw new Error('sanitizeUrl encountered unsafe URL: ' + url);
    }
  } catch (err) {
    throw new Error('sanitizeUrl encountered broken URL: ' + url);
  }
  return url;
}
