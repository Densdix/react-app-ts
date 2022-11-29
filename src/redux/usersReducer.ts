import {axiosFollow, axiosGetUsers, axiosUnfollow} from "../api/api";
import {ProfileUserPhotosType} from "./profileReducer";

const FOLLOWED = "FOLLOWED";
const UNFOLLOWED = "UNFOLLOWED";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_FRIENDS = "SET_FRIENDS";
const SET_FOLLOWING_IN_PROGRESS = "SET_FOLLOWING_IN_PROGRESS";


type UserDataType = {
    id: number,
    name: string,
    status: string,
    photos: ProfileUserPhotosType
}

let initState = {
    usersData: [] as Array<UserDataType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    friendsData: [],
    followingElements: [] as Array<number>
}

type InitStateType = typeof initState

const usersReducer = (state = initState, action: any): InitStateType => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                usersData: state.usersData.map(item => item.id === action.userId ? {...item, followed: true} : item)
            }
        case UNFOLLOWED:
            return {
                ...state,
                usersData: state.usersData.map(item => item.id === action.userId ? {...item, followed: false} : item)
            }
        case SET_USERS:
            console.log("SET_USERS")
            return {
                ...state,
                //usersData: [...state.usersData, ...action.usersData],
                usersData: action.usersData,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_USERS_TOTAL_COUNT:
            console.log("SET_USERS_TOTAL_COUNT")
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }
        case TOGGLE_FETCHING:
            console.log("TOGGLE_FETCHING")
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case SET_FRIENDS:
            return {
                ...state,
                friendsData: action.friendsData,
            }
        case SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingElements: action.followingStatus
                    ? [...state.followingElements, action.userId]
                    : state.followingElements.filter(el => el !== action.userId)
            }
        default:
            return state
    }
}

type FollowedActionType = {
    type: typeof FOLLOWED
    userId: number
}
export const followedActionCreator = (userId: number) : FollowedActionType => {
    return {type: FOLLOWED, userId: userId}
}

type UnfollowedActionType = {
    type: typeof UNFOLLOWED
    userId: number
}
export const unfollowedActionCreator = (userId: number): UnfollowedActionType => {
    return {type: UNFOLLOWED, userId: userId}
}

type SetUsersActionType = {
    type: typeof SET_USERS
    usersData: Array<UserDataType>
}
export const setUsersActionCreator = (usersData: Array<UserDataType>) : SetUsersActionType => {
    return {type: SET_USERS, usersData: usersData}
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageActionCreator = (currentPage: number) : SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage}
}

type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalCount: number
}
export const setUsersTotalCountActionCreator = (totalCount: number) : SetUsersTotalCountActionType => {
    return {type: SET_USERS_TOTAL_COUNT, totalCount: totalCount}
}

type ToggleFetchingActionType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}
export const toggleFetchingActionCreator = (isFetching: boolean): ToggleFetchingActionType => {
    return {type: TOGGLE_FETCHING, isFetching: isFetching}
}

type SetFriendsActionType = {
    type: typeof SET_FRIENDS
    friendsData: any
}
export const setFriendsActionCreator = (friendsData : any): SetFriendsActionType => {
    return {type: SET_FRIENDS, friendsData: friendsData}
}

type SetFollowingInProgressActionType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS
    followingStatus: boolean
    userId: number
}
export const setFollowingInProgressActionCreator = (followingStatus: boolean, userId: number) : SetFollowingInProgressActionType => {
    return {type: SET_FOLLOWING_IN_PROGRESS, followingStatus: followingStatus, userId: userId}
}

let cp = 1
let users = []

export const getUsersThunkCreator = (pageSize: number, currentPage: number) => {
    return (dispatch: any) => {
        dispatch(toggleFetchingActionCreator(true))

        axiosGetUsers(pageSize, currentPage).then(data => {
            dispatch(toggleFetchingActionCreator(false))
            dispatch(setUsersActionCreator(data.items))
            dispatch(setUsersTotalCountActionCreator(data.totalCount))

            // console.log(data.totalCount / 100)
            //
            // let interval = setInterval(() => {
            //     if (cp <= Math.ceil(data.totalCount / 100)) {
            //         axiosGetUsers(100, cp).then(data => {
            //             console.log("cp", cp)
            //             users.push(...data.items)
            //         })
            //     cp = cp + 1
            //     } else {
            //         clearInterval(interval)
            //         console.log("END", users)
            //         const filteredUsers = users.filter(u => u.photos.large !== null)
            //         console.log(filteredUsers);
            //         console.log(filteredUsers.length)
            //     }
            //
            // }, 3000);
        })
    }
}

export const followUserThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(setFollowingInProgressActionCreator(true, userId))
        axiosFollow(userId).then(data => {
            if(data.resultCode === 0)
                dispatch(followedActionCreator(userId))
            dispatch(setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export const unfollowUserThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(setFollowingInProgressActionCreator(true, userId))
        axiosUnfollow(userId).then(data => {
            if(data.resultCode === 0)
                dispatch(unfollowedActionCreator(userId))
            dispatch(setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export default usersReducer