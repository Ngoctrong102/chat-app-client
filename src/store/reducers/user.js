const initState = {
    user: null,
    token: localStorage.getItem("token") || null,
    friends: [],
    reqFriends: [],
    conversations: [],
    error: false,
    errMessage: '',
    currentConversation: null,
    newMessage: false

}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            {
                return {
                    ...state,
                    ...action.payload
                };

            }
        case "FETCH_USER_INFOR":
            {
                return {
                    ...state,
                    // user: action.payload.user,
                    // friends: action.payload.friends,
                    // reqFriends: action.payload.reqFriends
                    ...action.payload
                }
            }
        case "LOGOUT":
            {
                return initState;
            }
        case "LOGIN_ERR":
            {
                return {
                    ...state,
                    error: true,
                    errMessage: action.payload.errMessage
                }
            }
        case "RESET_ERR":
            {
                return {
                    ...state,
                    error: false,
                    errMessage: ''
                }
            }
        case "UPDATE_USER_INFOR":
            {
                return {
                    ...state,
                    user: {...state.user, ...action.payload.user }
                }
            }
        case "PUSH_REQ_FRIEND":
            {
                return {
                    ...state,
                    reqFriends: [action.payload.from, ...state.reqFriends]
                }
            }
        case "ADD_NEW_FRIEND":
            {
                return {
                    ...state,
                    friends: [...state.friends, action.payload.friend],
                    reqFriends: state.reqFriends.filter(req => req._id !== action.payload.friend._id)
                }
            }
        case "OPEN_CONVERSATION":
            {
                var conversationIndex = state.conversations.findIndex(con => con._id == action.payload.conversation._id)
                if (conversationIndex !== -1) {
                    return {
                        ...state,
                        currentConversation: conversationIndex
                    }
                } else {
                    return {
                        ...state,
                        currentConversation: 0,
                        conversations: [action.payload.conversation, ...state.conversations]
                    }
                }

            }
        case "NEW_MESSAGE":
            {
                let newConversations = state.conversations.map(con => {
                    if (con._id == action.payload.conversationID) {
                        return {
                            ...con,
                            messages: [...con.messages, action.payload.message],
                            newMessage: state.user._id !== action.payload.message.user._id
                        }
                    } else return con;
                })
                return {
                    ...state,
                    conversations: newConversations,
                    newMessage: state.user._id !== action.payload.message.user._id
                }
            }

        case "FIRST_MESSAGE":
            {
                var conIndex = state.conversations.findIndex(con => con._id == action.payload.oldID);
                if (conIndex != -1) {
                    var newCons = [...state.conversations];
                    newCons[conIndex] = action.payload.conversation
                    return {
                        ...state,
                        conversations: newCons
                    }
                } else {
                    return {
                        ...state,
                        conversations: [action.payload.conversation, ...state.conversations]
                    }
                }
            }
        case "CHANGE_CONVERSATION":
            {
                // if (state.conversations[action.payload.index].newMessage) {
                //     state.conversations[action.payload.index].newMessage = false;
                // }
                return {
                    ...state,
                    currentConversation: action.payload.index
                }
            }
        default:
            {
                return state;
            }
    }
}

export default userReducer;