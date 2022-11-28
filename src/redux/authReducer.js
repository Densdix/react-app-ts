import {axiosGetCaptcha, axiosGetCurrentUserData, axiosPostSignIn, axiosPostSignOut} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const RESET_USER_DATA = "RESET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initState, action) => {
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

export const setUserDataActionCreator = (userId, email, login, isAuth) => {
    return {type: SET_USER_DATA, data: {userId, email, login, isAuth}}
}

export const resetUserDataActionCreator = () => {
    return {type: RESET_USER_DATA}
}

export const setCurrentUserThunkCreator = () => {
    return (dispatch) => {
        return axiosGetCurrentUserData().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setUserDataActionCreator(id, email, login))
            }
        })
    }
}

export const userSignInThunkCreator = (formData) => {
    return (dispatch) => {
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
    return (dispatch) => {
        axiosPostSignOut().then(response => {
            if (response.resultCode === 0) {
                dispatch(resetUserDataActionCreator())
            }
        })
    }
}

export const setCaptchaUrlActionCreator = (captchaUrl) => {
    return {type: SET_CAPTCHA_URL, captchaUrl: captchaUrl}
}

export const getCaptchaThunkCreator = () => {
    return (dispatch) => {
        axiosGetCaptcha().then(data => {
            dispatch(setCaptchaUrlActionCreator(data.url))
        })
    }
}


export default authReducer