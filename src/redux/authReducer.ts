import {axiosGetCaptcha, axiosGetCurrentUserData, axiosPostSignIn, axiosPostSignOut} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const RESET_USER_DATA = "RESET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

type InitStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: false,
    captchaUrl: string | null
}

let initState: InitStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initState, action: any): InitStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case RESET_USER_DATA:
            return {
                ...state,
                ...initState
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
}

type UserDataType = {
    userId: number,
    email: string,
    login: string,
    isAuth: boolean
}
type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: UserDataType
}
export const setUserDataActionCreator = (userId: number, email: string, login: string, isAuth: boolean): SetUserDataActionType => {
    return {type: SET_USER_DATA, data: {userId, email, login, isAuth}}
}

type ResetUserDataActionType = {
    type: typeof RESET_USER_DATA
}
export const resetUserDataActionCreator = (): ResetUserDataActionType => {
    return {type: RESET_USER_DATA}
}

export const setCurrentUserThunkCreator = () => {
    return (dispatch: any) => {
        return axiosGetCurrentUserData().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserDataActionCreator(id, email, login, true))
            }
        })
    }
}

export const userSignInThunkCreator = (formData: any) => {
    return (dispatch: any) => {
        axiosPostSignIn(formData).then(response => {
            if (response.resultCode === 0) {
                console.log("success", response)
                dispatch(setCurrentUserThunkCreator())
            } else {
                if (response.resultCode === 10) {
                    dispatch(getCaptchaThunkCreator())
                }
                dispatch(stopSubmit("login", {_error: response.messages[0]}))
            }
        })
    }
}

export const userSignOutThunkCreator = () => {
    return (dispatch: any) => {
        axiosPostSignOut().then(response => {
            if (response.resultCode === 0) {
                dispatch(resetUserDataActionCreator())
            }
        })
    }
}

type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}
export const setCaptchaUrlActionCreator = (captchaUrl: string): setCaptchaUrlActionType => {
    return {type: SET_CAPTCHA_URL, captchaUrl: captchaUrl}
}

export const getCaptchaThunkCreator = () => {
    return (dispatch: any) => {
        axiosGetCaptcha().then(data => {
            dispatch(setCaptchaUrlActionCreator(data.url))
        })
    }
}


export default authReducer