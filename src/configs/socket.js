import io from 'socket.io-client';
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8888/";

export default token => io(API_URL, {
    auth: {
        token: token
    }
});