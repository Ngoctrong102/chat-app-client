import getToken from "../helpers/getToken";
import serialize from "../helpers/serialize";

const API_URL = "http://localhost:8888";
class User {
    fetchInfor(token) {
        return fetch(API_URL + "/user/fetchInfor", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ token })
            })
            .then(res => res.json())
            .catch(err => err)
    }
    login(email, password) {
        return fetch(API_URL + "/user/login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ email, password })
            }).then(res => res.json())
            .catch(err => console.error(err))
    }
    signUp(email, username, password, repass) {
        if (password !== repass) {
            throw new Error('Re-Password not same password');
        }
        return fetch(API_URL + "/user/signup", {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email, username, password, repass })
        }).then(res => res.json());
    }
    updateProfile(formData) {
        return fetch(API_URL + "/user/profile/update", {
                method: "post",
                headers: {
                    'x-access-token': getToken()
                },
                body: formData
            })
            .then(res => res.json())
    }
    searchFriends(keyword) {
        return fetch(API_URL + "/user/searchFriends?" + serialize({ keyword }), {
                method: "get",
                headers: {
                    'x-access-token': getToken()
                }
            })
            .then(res => res.json())
    }
    getConversation(users) {
        return fetch(API_URL + "/conversation", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': getToken()
                },
                body: JSON.stringify({ users })
            })
            .then(res => res.json())
    }
}


export default new User();