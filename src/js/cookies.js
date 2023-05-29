export const popup = document.querySelector('.cookies');
export const acceptBtn = document.querySelector('#accept-cookies');

export function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function acceptCookies() {
  popup.style.display = 'none';
  setCookie('cookiesAccepted', 'true', 365);
}

if (!getCookie('cookiesAccepted')) {
  setTimeout(() => {
    popup.style.display = 'block';
  }, 1000);
}

acceptBtn.addEventListener('click', acceptCookies);
