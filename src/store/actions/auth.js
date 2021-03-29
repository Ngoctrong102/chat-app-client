import User from '../../service/User';
import setToken from '../../helpers/setToken';
import removeToken from '../../helpers/removeToken';


export const handleLogin = (email, password, rememberMe) => async dispatch => {
    try {
        var respone = await User.login(email, password);
        if (respone.status === "Error") {
            return dispatch({
                type: "LOGIN_ERR",
                payload: {
                    errMessage: respone.message
                }
            })
        }
        dispatch({
            type: "LOGIN",
            payload: respone
        })
        setToken(rememberMe, respone.token);
    } catch (err) {
        console.error(err)
    }
}

export const fetchUserInfor = (token) => async dispatch => {
    try {
        const respone = await User.fetchInfor(token);
        dispatch({
            type: "FETCH_USER_INFOR",
            payload: respone
        })
    } catch (err) {
        console.error(err + " lỗi nè");
    }
}

export const logout = () => {
    removeToken();
    return {
        type: "LOGOUT"
    }
}

export const handleSignUp = (email, username, password, repass) => async dispatch => {
    try {
        var respone = await User.signUp(email, username, password, repass);
        localStorage.setItem('token', respone.token);
        dispatch({
            type: "LOGIN",
            payload: {
                user: respone.user,
                token: respone.token,
                friends: respone.friends,
                reqFriends: respone.reqFriends
            }
        })
    } catch (err) {
        console.error(err);
    }
}


export const resetErr = () => {
    return {
        type: "RESET_ERR"
    }
}