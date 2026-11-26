export const R2_PUBLIC_URL =
  "https://pub-1089741a53bb4ca8be7545910f70ec71.r2.dev";

const R2_PATHS = ["/brand/", "/projects/", "/services/", "/assets/"];

export function publicMediaUrl(value: string) {
  if (
    value === "/favicon.ico" ||
    R2_PATHS.some((path) => value.startsWith(path))
  )
    return `${R2_PUBLIC_URL}${value}`;
  return value;
}
