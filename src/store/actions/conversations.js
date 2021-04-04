import User from '../../service/User';
export const openConversation = (users) => async dispatch => {
    var conversation = await User.getConversation(users);
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