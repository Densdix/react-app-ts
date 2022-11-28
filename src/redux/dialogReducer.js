export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initState = {
    dialogsData: [
        {id: 1, name: "DimaDev", msg: ["Hi, Hello, How Are you"]},
        {id: 2, name: "Victor"},
        {id: 3, name: "Alina"},
        {id: 4, name: "Ramzes"},
        {id: 5, name: "Alestsu"},
    ],
    messageData: [
        {id: 1, msg: "Hi"},
        {id: 2, msg: "Hello"},
        {id: 3, msg: "Go ogo go"},
        {id: 4, msg: "How are yo"}
    ],
    newMessageText: ""
}

const dialogReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                // newMessageText: "",
                messageData: [...state.messageData, {
                    id: state.dialogsData.length,
                    msg: action.value
                }]
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }
        default:
            return state
    }
}

export const addMessageActionCreator = (value) => {
    return {type: ADD_MESSAGE, value: value}
}

export default dialogReducer