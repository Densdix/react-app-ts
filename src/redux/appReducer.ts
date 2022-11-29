import {setCurrentUserThunkCreator} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
// const FAKE = "FAKE";

type InitStateType = {
    initialized : boolean
}

let initState : InitStateType = {
    initialized: false
}

const appReducer = (state = initState, action : any) : InitStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type initSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initSuccessActionCreator = (): initSuccessActionType => {
    return {type: INITIALIZED_SUCCESS}
}

export const initAppThunkCreator = () => {
    return (dispatch: any) => {
        let promise = dispatch(setCurrentUserThunkCreator())

        Promise.all([promise]).then(()=>{
            dispatch(initSuccessActionCreator())
        })

    }
}

export default appReducer