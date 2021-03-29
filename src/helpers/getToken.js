export default function getToken() {
    var token = sessionStorage.getItem('token');
    return token || localStorage.getItem('token');
}