export default function setToken(rememberMe, token) {
    if (rememberMe) localStorage.setItem('token', token);
    else sessionStorage.setItem('token', token);
}