const publicBase = import.meta.env.BASE_URL || '/'

export function getPublicAssetUrl(path) {
  const value = String(path || '')

  if (/^(https?:|data:|blob:)/.test(value)) {
    return value
  }

  if (publicBase !== '/' && value.startsWith(publicBase)) {
    return value
  }

  return `${publicBase}${value.replace(/^\/+/, '')}`
}
