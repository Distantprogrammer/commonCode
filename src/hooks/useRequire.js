export const useRequire = (url) => {
  const str = url.replace('@','./src')
  return new URL(str, window.location.origin).href
}