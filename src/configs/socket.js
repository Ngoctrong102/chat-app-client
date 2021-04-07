import io from 'socket.io-client';
const getSocket = token => io(process.env.REACT_APP_API_URL, {
    auth: {
        token: token
    }
});
export default getSocket;