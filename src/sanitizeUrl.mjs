/**
 * Blocks dangerous URLs that start with "javascript:".
 * @param {string} url
 */
export function sanitizeUrl(url) {
  try {
    if (!['https:', 'http:'].includes(new URL(url).protocol)) {
      throw new Error('sanitizeUrl encountered unsafe URL: ' + url);
    }
  } catch (err) {
    throw new Error('sanitizeUrl encountered broken URL: ' + url);
  }
  return url;
}
