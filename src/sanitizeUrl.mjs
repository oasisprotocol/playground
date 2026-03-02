/**
 * Allow only http(s) absolute URLs.
 * Returns a sanitized string or null if invalid/unsafe.
 * Never throws.
 * @param {string | undefined | null} url
 * @returns {string | null}
 */
export function sanitizeUrl(url) {
  if (!url) return null;

  const trimmed = String(url).trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }

    // Return normalized absolute URL string
    return parsed.toString();
  } catch {
    return null;
  }
}