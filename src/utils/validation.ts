export function validateExtension(file: string, ext: string) {
  // EXT_REGEX: /\.md$/;
  const EXT_REGEX = new RegExp('\\.' + ext + '$');
  return EXT_REGEX.test(file);
}
