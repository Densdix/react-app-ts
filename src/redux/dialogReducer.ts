const ADD_MESSAGE = "ADD_MESSAGE";

type DialogsDataType = {
    id: number,
    name: string
}

type MessageDataType = {
    id: number,
    msg: string
}

let initState = {
    dialogsData: [
        {id: 1, name: "DimaDev"},
        {id: 2, name: "Victor"},
        {id: 3, name: "Alina"},
        {id: 4, name: "Ramzes"},
        {id: 5, name: "Alestsu"},
    ] as Array<DialogsDataType>,
    messageData: [
        {id: 1, msg: "Hi"},
        {id: 2, msg: "Hello"},
        {id: 3, msg: "Go ogo go"},
        {id: 4, msg: "How are yo"}
    ] as Array<MessageDataType>,
    newMessageText: ""
}

export type InitStateType = typeof initState

const dialogReducer = (state = initState, action: any): InitStateType => {
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
        default:
            return state
    }
}

type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    value: string
}

export const addMessageActionCreator = (value: string): AddMessageActionType => {
    return {type: ADD_MESSAGE, value: value}
}

export default dialogReducer