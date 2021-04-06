import io from 'socket.io-client';
export default token => io(process.env.REACT_APP_API_URL, {
    auth: {
        token: token
    }
});