import {InferActionsTypes} from "./reactStore";

export type DialogsDataType = {
    id: number,
    name: string
}

export type MessageDataType = {
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

type InitStateType = typeof initState
type ActionType = InferActionsTypes<typeof dialogActionsCreators>

const dialogReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "DIALOG/ADD_MESSAGE":
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

export const dialogActionsCreators = {
    addMessageActionCreator: (value: string) => {
        return {type: 'DIALOG/ADD_MESSAGE', value: value} as const
    }
}

export default dialogReducer