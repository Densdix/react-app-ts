import {setCurrentUserThunkCreator} from "./authReducer";
import {AppStateType, InferActionsTypes} from "./reactStore";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action, Dispatch} from "redux";
import {FormAction} from "redux-form/lib/actions";
// const FAKE = "FAKE";

type InitStateType = {
    initialized : boolean
}

let initState : InitStateType = {
    initialized: false
}

type ActionTypes = InferActionsTypes<typeof appActionTypes>

const appReducer = (state = initState, action : ActionTypes) : InitStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export const appActionTypes = {
    initSuccessActionCreator: () => {
        return {type: 'APP/INITIALIZED_SUCCESS'} as const
    }
}


export const initAppThunkCreator = () => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
        let promise = dispatch(setCurrentUserThunkCreator())

        Promise.all([promise]).then(()=>{
            dispatch(appActionTypes.initSuccessActionCreator())
        })

    }
}

export default appReducer