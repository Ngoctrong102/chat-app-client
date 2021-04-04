const initState = {
    feature: "Chat",
    popUp: ''
}

const navigatorReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_FEATURE":
            {
                return {
                    ...state,
                    feature: action.payload.feature
                };
            }
        case "TOGGLE_POP_UP":
            {
                return {
                    ...state,
                    popUp: action.payload.popUp
                }
            }
        case "OPEN_CONVERSATION":
            {
                return {
                    ...state,
                    feature: "Chat",
                    popUp: ''
                }
            }
        default:
            {
                return state
            }
    }
}

export default navigatorReducer;