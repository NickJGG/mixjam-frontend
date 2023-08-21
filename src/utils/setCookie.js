const setCookie = (cookies, cookieName, cookieValue) => {
    cookies?.set(cookieName, cookieValue, { path: '/', maxAge: 10 * 365 * 24 * 3600 });
}

export default setCookie;
