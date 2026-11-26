function parseHttpsUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port) {
      return url;
    }
  } catch {
    return null;
  }

  return null;
}

export function getTilopayPaymentUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  const url = parseHttpsUrl(value);
  if (!url) return null;

  const configuredOrigins = (process.env.TILOPAY_PAYMENT_ORIGINS ?? 'https://app.tilopay.com').split(',');
  const allowed = configuredOrigins.some((entry) => {
    const origin = parseHttpsUrl(entry.trim());
    return origin?.origin === url.origin && origin.pathname === '/' && !origin.search && !origin.hash;
  });

  return allowed ? url.href : null;
}
