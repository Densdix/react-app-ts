import {stopSubmit} from "redux-form";
import {authAPI, ResultCodeCaptcha, ResultCodes} from "../api/api";
import {LoginFormDataType} from "../components/Login/Login";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./reactStore";
import {ThunkAction} from "redux-thunk";

type InitStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initState: InitStateType = {
    userId: null as number | null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

type ActionsTypes = InferActionsTypes<typeof authActionsCreators>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

const authReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "AUTH/SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case "AUTH/RESET_USER_DATA":
            return {
                ...state,
                ...initState
            }
        case "AUTH/SET_CAPTCHA_URL":
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

// type UserDataType = {
//     userId: number,
//     email: string,
//     login: string,
//     isAuth: boolean
// }
// type SetUserDataActionType = {
//     type: typeof SET_USER_DATA,
//     data: UserDataType
// }

export const authActionsCreators = {
    setUserDataActionCreator: (userId: number, email: string, login: string, isAuth: boolean) => {
        return {type: 'AUTH/SET_USER_DATA', data: {userId, email, login, isAuth}} as const
    },
    resetUserDataActionCreator: () => {
        return {type: 'AUTH/RESET_USER_DATA'} as const
    },
    setCaptchaUrlActionCreator: (captchaUrl: string) => {
        return {type: 'AUTH/SET_CAPTCHA_URL', captchaUrl: captchaUrl} as const
    }
}

// type ResetUserDataActionType = {
//     type: typeof RESET_USER_DATA
// }


export const setCurrentUserThunkCreator = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        return authAPI.axiosGetCurrentUserData().then(data => {
            if (data.resultCode === ResultCodes.RESPONSE_SUCCESS) {
                let {id, email, login} = data.data
                dispatch(authActionsCreators.setUserDataActionCreator(id, email, login, true))
            }
        })
    }
}

export const userSignInThunkCreator = (formData: LoginFormDataType): ThunkType => {
    return (dispatch) => {
        authAPI.axiosPostSignIn(formData).then(data => {
            if (data.resultCode === ResultCodes.RESPONSE_SUCCESS) {
                console.log("success", data)
                dispatch(setCurrentUserThunkCreator())
            } else {
                if (data.resultCode === ResultCodeCaptcha.RESPONSE_CAPTCHA_IS_REQUIRED) {
                    dispatch(getCaptchaThunkCreator())
                }
                dispatch(stopSubmit("login", {_error: data.messages[0]}))
            }
        })
    }
}

export const userSignOutThunkCreator = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        authAPI.axiosPostSignOut().then(response => {
            if (response.resultCode === 0) {
                dispatch(authActionsCreators.resetUserDataActionCreator())
            }
        })
    }
}
//
// type setCaptchaUrlActionType = {
//     type: typeof SET_CAPTCHA_URL
//     captchaUrl: string
// }


export const getCaptchaThunkCreator = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        authAPI.axiosGetCaptcha().then(data => {
            dispatch(authActionsCreators.setCaptchaUrlActionCreator(data.url))
        })
    }
}


export default authReducer