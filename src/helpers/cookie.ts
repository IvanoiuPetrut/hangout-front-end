function setCookie(name: string, value: string, hoursToExpire: number): void {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000);

  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax;`;
  document.cookie = cookieString;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

export { setCookie, deleteCookie, getCookie };
