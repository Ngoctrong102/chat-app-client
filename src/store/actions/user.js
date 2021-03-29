import User from "../../service/User"

export const submitProfile = (formData) => async dispatch => {
    var respone = await User.updateProfile(formData);
    dispatch({
        type: "UPDATE_USER_INFOR",
        payload: {
            user: respone.user
        }
    })
}

export const pushReqFriends = (req) => {
    return {
        type: 'PUSH_REQ_FRIEND',
        payload: {
            from: req.from
        }
    }
}

export const addNewFriend = (friend) => {
    return {
        type: 'ADD_NEW_FRIEND',
        payload: {
            friend
        }
    }
}