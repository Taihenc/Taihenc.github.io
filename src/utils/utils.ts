export const getLogoName = (src: string) => {
  // Extract the name from the URL
  const name = src.split('/').pop()?.split('.')[0]
  return name ? name : 'Unknown'
}
