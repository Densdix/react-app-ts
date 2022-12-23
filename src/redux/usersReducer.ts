import {ProfileUserPhotosType} from "./profileReducer";
import {AppStateType, InferActionsTypes} from "./reactStore";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type UserDataType = {
    id: number,
    name: string,
    status: string | null,
    photos: ProfileUserPhotosType,
    followed: boolean
}

let initState = {
    usersData: [] as Array<UserDataType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    friendsData: [],
    followingElements: [] as Array<number>,
    filter: {
        term: "" as string,
        friend: null as boolean | null
    }
}

type InitStateType = typeof initState

type ActionsTypes = InferActionsTypes<typeof usersActionsCreators>

const usersReducer = (state = initState, action: ActionsTypes): InitStateType => {
    switch (action.type) {
        case "USERS/FOLLOWED":
            return {
                ...state,
                usersData: state.usersData.map(item => item.id === action.userId ? {...item, followed: true} : item)
            }
        case "USERS/UNFOLLOWED":
            return {
                ...state,
                usersData: state.usersData.map(item => item.id === action.userId ? {...item, followed: false} : item)
            }
        case "USERS/SET_USERS":
            console.log("SET_USERS")
            return {
                ...state,
                //usersData: [...state.usersData, ...action.usersData],
                usersData: action.usersData,
            }
        case "USERS/SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case "USERS/SET_USERS_TOTAL_COUNT":
            console.log("SET_USERS_TOTAL_COUNT")
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }
        case "USERS/TOGGLE_FETCHING":
            console.log("TOGGLE_FETCHING")
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case "USERS/SET_FRIENDS":
            return {
                ...state,
                friendsData: action.friendsData,
            }
        case "USERS/SET_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingElements: action.followingStatus
                    ? [...state.followingElements, action.userId]
                    : state.followingElements.filter(el => el !== action.userId)
            }
        case "USERS/SET_USER_SEARCH_FILTER":
            return {
                ...state,
                filter: {...state.filter, term: action.term, friend: action.friend}
            }
        default:
            return state
    }
}

export const usersActionsCreators = {
    followedActionCreator: (userId: number) => {
        return {type: 'USERS/FOLLOWED', userId: userId} as const
    },
    unfollowedActionCreator: (userId: number) => {
        return {type: 'USERS/UNFOLLOWED', userId: userId} as const
    },

    setUsersActionCreator: (usersData: Array<UserDataType>) => {
        return {type: 'USERS/SET_USERS', usersData: usersData} as const
    },

    setCurrentPageActionCreator: (currentPage: number) => {
        return {type: 'USERS/SET_CURRENT_PAGE', currentPage: currentPage} as const
    },

    setUsersTotalCountActionCreator: (totalCount: number) => {
        return {type: 'USERS/SET_USERS_TOTAL_COUNT', totalCount: totalCount} as const
    },

    toggleFetchingActionCreator: (isFetching: boolean) => {
        return {type: 'USERS/TOGGLE_FETCHING', isFetching: isFetching} as const
    },

    setFriendsActionCreator: (friendsData: any) => {
        return {type: 'USERS/SET_FRIENDS', friendsData: friendsData} as const
    },

    setFollowingInProgressActionCreator: (followingStatus: boolean, userId: number) => {
        return {type: 'USERS/SET_FOLLOWING_IN_PROGRESS', followingStatus: followingStatus, userId: userId} as const
    },
    setUserSearchFilterActionCreator: (term: string, friend: boolean | null) => {
        return {type: 'USERS/SET_USER_SEARCH_FILTER', term: term, friend: friend} as const
    }
}

export const getUsersThunkCreator = (pageSize: number = 5, currentPage: number = 1, term: string = "", friend: boolean | null = null) => {
    return (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
        dispatch(usersActionsCreators.toggleFetchingActionCreator(true))

        usersAPI.axiosGetUsers(pageSize, currentPage, term, friend).then(data => {
            dispatch(usersActionsCreators.toggleFetchingActionCreator(false))
            dispatch(usersActionsCreators.setUsersActionCreator(data.items))
            dispatch(usersActionsCreators.setUsersTotalCountActionCreator(data.totalCount))
        })
    }
}

export const followUserThunkCreator = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(usersActionsCreators.setFollowingInProgressActionCreator(true, userId))
        usersAPI.axiosFollow(userId).then(data => {
            if (data.resultCode === 0)
                dispatch(usersActionsCreators.followedActionCreator(userId))
            dispatch(usersActionsCreators.setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export const unfollowUserThunkCreator = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(usersActionsCreators.setFollowingInProgressActionCreator(true, userId))
        usersAPI.axiosUnfollow(userId).then(data => {
            if (data.resultCode === 0)
                dispatch(usersActionsCreators.unfollowedActionCreator(userId))
            dispatch(usersActionsCreators.setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export default usersReducer