import {
    axiosGetStatusText,
    axiosGetUserProfile, axiosPutProfileData, axiosPutProfilePhoto,
    axiosPutStatusText
} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_PROFILE_USER = "UPDATE_PROFILE_USER";
const STATUS_TEXT_CHANGE = "STATUS_TEXT_CHANGE";
const UPDATE_PROFILE_PHOTO = "UPDATE_PROFILE_PHOTO";
const PROFILE_EDIT_MODE = "PROFILE_EDIT_MODE";

let initState = {
    postData: [
        {
            id: 1,
            msg: "Hi, Hello from you",
            likesCount: 10,
            imgUrl: "https://www.pngall.com/" +
                "wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
        },
        {
            id: 2,
            msg: "See yaa",
            likesCount: 30,
            imgUrl: "https://img.freepik.com/" +
                "premium-vector/man-avatar-profile-on-round-icon_24640-14044.jpg?w=2000"
        },
        {
            id: 3,
            msg: "GGWP",
            likesCount: 60,
            imgUrl: "https://w7.pngwing.com/" +
                "pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
        }
    ],
    newPostText: "",
    profileUserData: null,
    profileUserStatus: null,
    profileEditMode: false
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}


const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postData.length,
                msg: action.newPostText,
                imgUrl: state.postData[getRandomInt(3)].imgUrl,
                likesCount: 10
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ""
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case UPDATE_PROFILE_USER:
            return {
                ...state,
                profileUserData: action.profileUserData
            }
        case STATUS_TEXT_CHANGE:
            return {
                ...state,
                profileUserStatus: action.profileUserStatus
            }
        case UPDATE_PROFILE_PHOTO:
            return {
                ...state,
                profileUserData: {...state.profileUserData, photos: action.photos}
            }
        case PROFILE_EDIT_MODE:
            return {
                ...state,
                profileEditMode: action.isEnabled
            }
        default:
            return state
    }
}

export const addPostActionCreator = (newPostText) => {
    return {type: ADD_POST, newPostText: newPostText}
}

export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}
export const updateProfileUserActionCreator = (data) => {
    return {type: UPDATE_PROFILE_USER, profileUserData: data}
}

export const statusTextChangeActionCreator = (profileUserStatus) => {
    return {type: STATUS_TEXT_CHANGE, profileUserStatus: profileUserStatus}
}

export const setUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        axiosGetUserProfile(userId).then(data => {
            dispatch(updateProfileUserActionCreator(data))
        })
    }
}

export const setUserStatusThunkCreator = (userId) => {
    return (dispatch) => {
        axiosGetStatusText(userId).then(data => {
            dispatch(statusTextChangeActionCreator(data))

        })
    }
}
export const updateStatusTextThunkCreator = (value) => {
    return (dispatch) => {
        axiosPutStatusText(value).then(data => {
            if (data.resultCode === 0)
                dispatch(statusTextChangeActionCreator(value))
        })
    }
}

export const updateProfilePhotoActionCreator = (photos) => {
    return {type: UPDATE_PROFILE_PHOTO, photos: photos}
}

export const updateProfilePhotoThunkCreator = (filePhoto) => {
    return (dispatch) => {
        axiosPutProfilePhoto(filePhoto).then(data => {
            if (data.resultCode === 0)
                dispatch(updateProfilePhotoActionCreator(data.data.photos))
        })
    }
}
export const saveProfileDataThunkCreator = (profileData) => {
    return (dispatch, getState) => {
        axiosPutProfileData(profileData).then(data => {
            if (data.resultCode === 0) {
                console.log(data)
                dispatch(setUserProfileThunkCreator(getState().auth.userId))
                dispatch(isProfileEditModeEnabled(false))
                console.log("data.resultCode === 0", false)
            } else {
                let contact = data.messages[0].replace(')','').split('>')[1].toLowerCase()
                let contactObj = {}
                contactObj[contact] = data.messages[0]
                console.log("saveProfileDataThunkCreator", contact)
                //dispatch(stopSubmit("profileInfo", {_error: data.messages[0], "contacts": contactObj }))
                dispatch(stopSubmit("profileInfo", {"contacts": contactObj }))
                // dispatch(isProfileEditModeEnabled(true))
            }
        })
    }
}

export const isProfileEditModeEnabled = (isEnabled) => {
    return {type: PROFILE_EDIT_MODE, isEnabled: isEnabled}
}


export default profileReducer