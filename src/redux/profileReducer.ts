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

type PostDataType = {
    id: number,
    msg: string,
    likesCount: number,
    imgUrl: string
}

type ProfileUserContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileUserPhotosType = {
    small: string | null
    large: string | null
}

type ProfileUserDataType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileUserContactsType
    photos: ProfileUserPhotosType
}

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
    ] as Array<PostDataType>,
    newPostText: "",
    profileUserData: null as ProfileUserDataType | null,
    profileUserStatus: null as string | null,
    profileEditMode: false
}

export type InitStateType = typeof initState

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}


const profileReducer = (state = initState, action: any) => {
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

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => {
    return {type: ADD_POST, newPostText: newPostText}
}

type UpdateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}

export const updateNewPostTextActionCreator = (text: string) : UpdateNewPostTextActionType => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

type UpdateProfileUserActionType = {
    type: typeof UPDATE_PROFILE_USER
    profileUserData: ProfileUserDataType

}

export const updateProfileUserActionCreator = (data: ProfileUserDataType) : UpdateProfileUserActionType => {
    return {type: UPDATE_PROFILE_USER, profileUserData: data}
}

type StatusTextChangeActionType = {
    type: typeof STATUS_TEXT_CHANGE
    profileUserStatus: string
}

export const statusTextChangeActionCreator = (profileUserStatus: string) : StatusTextChangeActionType => {
    return {type: STATUS_TEXT_CHANGE, profileUserStatus: profileUserStatus}
}

export const setUserProfileThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        axiosGetUserProfile(userId).then(data => {
            dispatch(updateProfileUserActionCreator(data))
        })
    }
}

export const setUserStatusThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        axiosGetStatusText(userId).then(data => {
            dispatch(statusTextChangeActionCreator(data))

        })
    }
}
export const updateStatusTextThunkCreator = (value: string) => {
    return (dispatch: any) => {
        axiosPutStatusText(value).then(data => {
            if (data.resultCode === 0)
                dispatch(statusTextChangeActionCreator(value))
        })
    }
}

type UpdateProfilePhotoActionType = {
    type: typeof UPDATE_PROFILE_PHOTO
    photos: ProfileUserPhotosType
}

export const updateProfilePhotoActionCreator = (photos: ProfileUserPhotosType) : UpdateProfilePhotoActionType => {
    return {type: UPDATE_PROFILE_PHOTO, photos: photos}
}

export const updateProfilePhotoThunkCreator = (filePhoto: any) => {
    return (dispatch: any) => {
        axiosPutProfilePhoto(filePhoto).then(data => {
            if (data.resultCode === 0)
                dispatch(updateProfilePhotoActionCreator(data.data.photos))
        })
    }
}
export const saveProfileDataThunkCreator = (profileData: ProfileUserDataType) => {
    return (dispatch: any, getState: any) => {
        axiosPutProfileData(profileData).then(data => {
            if (data.resultCode === 0) {
                console.log(data)
                dispatch(setUserProfileThunkCreator(getState().auth.userId))
                dispatch(isProfileEditModeEnabled(false))
                console.log("data.resultCode === 0", false)
            } else {
                let contact = data.messages[0].replace(')','').split('>')[1].toLowerCase()
                // let contactObj = {}
                // contactObj[contact] = data.messages[0]
                const contactObj = {
                    [contact] : data.messages[0]
                }
                console.log("contactObj[contact]", contactObj)
                console.log("saveProfileDataThunkCreator", contact)
                console.log("data.messages[0]", data.messages[0])
                //dispatch(stopSubmit("profileInfo", {_error: data.messages[0], "contacts": contactObj }))
                dispatch(stopSubmit("profileInfo", {"contacts": contactObj }))
                // dispatch(isProfileEditModeEnabled(true))
            }
        })
    }
}

type IsProfileEditModeEnabledType = {
    type: typeof PROFILE_EDIT_MODE
    isEnabled: boolean
}

export const isProfileEditModeEnabled = (isEnabled: boolean) : IsProfileEditModeEnabledType => {
    return {type: PROFILE_EDIT_MODE, isEnabled: isEnabled}
}


export default profileReducer