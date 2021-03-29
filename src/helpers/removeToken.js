export default function removeToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}