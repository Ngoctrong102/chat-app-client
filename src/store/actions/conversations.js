import User from '../../service/User';
export const openCoversation = (userID, friendID) => async dispatch => {
    var conversation = await User.getConversation(userID, friendID);
    dispatch({
        type: 'OPEN_CONVERSATION',
        payload: {
            conversation
        }
    })
}

export const addNewMessage = (conversationID, message) => {
    return {
        type: 'NEW_MESSAGE',
        payload: {
            conversationID,
            message
        }
    }
}

export const firstMessage = (oldID, conversation) => {
    return {
        type: 'FIRST_MESSAGE',
        payload: {
            oldID,
            conversation
        }
    }
}

export const changeConversation = (index) => {
    return {
        type: 'CHANGE_CONVERSATION',
        payload: {
            index
        }
    }
}