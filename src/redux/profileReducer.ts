import {stopSubmit} from "redux-form";
import {profileAPI} from "../api/api";
import {AppStateType, InferActionsTypes} from "./reactStore";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {FormAction} from "redux-form/lib/actions";

export type PostDataType = {
    id: number,
    msg: string,
    likesCount: number,
    imgUrl: string
}

export type ProfileUserContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type ProfileUserPhotosType = {
    small: string | null
    large: string | null
}

export type ProfileUserDataType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileUserContactsType
    photos: ProfileUserPhotosType
}

type InitStateType = typeof initState
type ActionType = InferActionsTypes<typeof profileActionsCreators>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType | FormAction>

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

const profileReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "PROFILE/ADD_POST":
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
        case "PROFILE/UPDATE_NEW_POST_TEXT":
            return {
                ...state,
                newPostText: action.newText
            }
        case "PROFILE/UPDATE_PROFILE_USER":
            return {
                ...state,
                profileUserData: action.profileUserData
            }
        case "PROFILE/STATUS_TEXT_CHANGE":
            return {
                ...state,
                profileUserStatus: action.profileUserStatus
            }
        case "PROFILE/UPDATE_PROFILE_PHOTO":
            return {
                ...state,
                profileUserData: {...state.profileUserData, photos: action.photos} as ProfileUserDataType
            }
        case "PROFILE/EDIT_MODE":
            return {
                ...state,
                profileEditMode: action.isEnabled
            }
        default:
            return state
    }
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const profileActionsCreators = {
    addPostActionCreator: (newPostText: string) => {
        return {type: 'PROFILE/ADD_POST', newPostText: newPostText} as const
    },

    updateNewPostTextActionCreator: (text: string) => {
        return {type: 'PROFILE/UPDATE_NEW_POST_TEXT', newText: text} as const
    },

    updateProfileUserActionCreator: (data: ProfileUserDataType) => {
        return {type: 'PROFILE/UPDATE_PROFILE_USER', profileUserData: data} as const
    },

    statusTextChangeActionCreator: (profileUserStatus: string) => {
        return {type: 'PROFILE/STATUS_TEXT_CHANGE', profileUserStatus: profileUserStatus} as const
    },

    updateProfilePhotoActionCreator: (photos: ProfileUserPhotosType) => {
        return {type: 'PROFILE/UPDATE_PROFILE_PHOTO', photos: photos} as const
    },

    isProfileEditModeEnabled: (isEnabled: boolean) => {
        return {type: 'PROFILE/EDIT_MODE', isEnabled: isEnabled} as const
    }


}

export const setUserProfileThunkCreator = (userId: number | null) => {
    return (dispatch: Dispatch<ActionType>) => {
        if(userId !== null)
            profileAPI.axiosGetUserProfile(userId).then(data => {
                dispatch(profileActionsCreators.updateProfileUserActionCreator(data))
            })
    }
}

export const setUserStatusThunkCreator = (userId: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        profileAPI.axiosGetStatusText(userId).then(data => {
            dispatch(profileActionsCreators.statusTextChangeActionCreator(data))

        })
    }
}
export const updateStatusTextThunkCreator = (value: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        profileAPI.axiosPutStatusText(value).then(data => {
            if (data.resultCode === 0)
                dispatch(profileActionsCreators.statusTextChangeActionCreator(value))
        })
    }
}

export const updateProfilePhotoThunkCreator = (filePhoto: File) => {
    return (dispatch: Dispatch<ActionType>) => {
        profileAPI.axiosPutProfilePhoto(filePhoto).then(data => {
            if (data.resultCode === 0)
                dispatch(profileActionsCreators.updateProfilePhotoActionCreator(data.data.photos))
        })
    }
}
export const saveProfileDataThunkCreator = (profileData: ProfileUserDataType): ThunkType => {
    return (dispatch, getState) => {
        profileAPI.axiosPutProfileData(profileData).then(data => {
            if (data.resultCode === 0) {
                console.log(data)
                dispatch(setUserProfileThunkCreator(getState().auth.userId))
                dispatch(profileActionsCreators.isProfileEditModeEnabled(false))
                console.log("data.resultCode === 0", false)
            } else {
                let contact = data.messages[0].replace(')', '').split('>')[1].toLowerCase()
                // let contactObj = {}
                // contactObj[contact] = data.messages[0]
                const contactObj = {
                    [contact]: data.messages[0]
                }
                console.log("contactObj[contact]", contactObj)
                console.log("saveProfileDataThunkCreator", contact)
                console.log("data.messages[0]", data.messages[0])
                //dispatch(stopSubmit("profileInfo", {_error: data.messages[0], "contacts": contactObj }))
                dispatch(stopSubmit("profileInfo", {"contacts": contactObj}))
                // dispatch(isProfileEditModeEnabled(true))
            }
        })
    }
}


export default profileReducer