export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) =>
    cookie.startsWith(`${name}=`)
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(
    cookie.split("=")[1]
  );
}

export function saveSessionCookie(
  name: string,
  value: string,
) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}