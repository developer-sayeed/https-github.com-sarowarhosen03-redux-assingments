import Cookies from "js-cookie";

export function setCookie(name, value, days) {
  Cookies.set(name, value, { expires: days }); // expires after 7 days
}
export function getCookie(name) {
  const cookieValue = Cookies.get(name);
  if (cookieValue) {
    return cookieValue;
  }
  return undefined;
}
