export const changeFeature = (feature) => {
    return {
        type: "CHANGE_FEATURE",
        payload: {
            feature
        }
    };
}

export function togglePopUp(formName = '') {
    return {
        type: "TOGGLE_POP_UP",
        payload: {
            popUp: formName
        }
    }
}