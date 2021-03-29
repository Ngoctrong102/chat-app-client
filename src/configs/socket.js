import io from 'socket.io-client';
export default token => io('http://localhost:8888', {
    auth: {
        token: token
    }
});