import {setCurrentUserThunkCreator} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
// const FAKE = "FAKE";

type InitStateType = {
    initialized : boolean
}

let initState : InitStateType = {
    initialized: false
}

const appReducer = (state = initState, action : any) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        // case FAKE:
        //     return {
        //         ...state
        //     }
        default:
            return state
    }
}

export const initSuccessActionCreator = () => {
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