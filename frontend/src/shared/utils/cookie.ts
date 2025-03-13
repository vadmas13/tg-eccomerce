export function getCookies(name: string) {
  const cookies = document.cookie.split("; ");
  const cookieObject: Record<string, unknown> = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObject[name] = decodeURIComponent(value);
  });
  return cookieObject[name];
}
