import {axiosFollow, axiosGetUsers, axiosUnfollow} from "../api/api";

const FOLLOWED = "FOLLOWED";
const UNFOLLOWED = "UNFOLLOWED";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_FRIENDS = "SET_FRIENDS";
const SET_FOLLOWING_IN_PROGRESS = "SET_FOLLOWING_IN_PROGRESS";


let initState = {
    // usersData: [
    //     {
    //         id: 1,
    //         followed: true,
    //         fullName: "Dima",
    //         status: "I am OK",
    //         location: {city: "Mykolaiv", country: "Ukraine"},
    //         photoUrl: "https://cdn-icons-png.flaticon.com/512/236/236831.png"
    //     },
    //     {
    //         id: 2,
    //         followed: false,
    //         fullName: "Lina",
    //         status: "I am Fine",
    //         location: {city: "Odessa", country: "Ukraine"},
    //         photoUrl: "https://cdn-icons-png.flaticon.com/512/236/236831.png"
    //     },
    //     {
    //         id: 3,
    //         followed: true,
    //         fullName: "Rita",
    //         status: "I am Good",
    //         location: {city: "Kiev", country: "Ukraine"},
    //         photoUrl: "https://cdn-icons-png.flaticon.com/512/236/236831.png"
    //     }
    // ]
    usersData: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    friendsData: [],
    followingElements: []
}

const usersReducer = (state = initState, action) => {
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

export const followedActionCreator = (userId) => {
    return {type: FOLLOWED, userId: userId}
}

export const unfollowedActionCreator = (userId) => {
    return {type: UNFOLLOWED, userId: userId}
}

export const setUsersActionCreator = (usersData) => {
    return {type: SET_USERS, usersData: usersData}
}

export const setCurrentPageActionCreator = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage}
}

export const setUsersTotalCountActionCreator = (totalCount) => {
    return {type: SET_USERS_TOTAL_COUNT, totalCount: totalCount}
}
export const toggleFetchingActionCreator = (isFetching) => {
    return {type: TOGGLE_FETCHING, isFetching: isFetching}
}
export const setFriendsActionCreator = (friendsData) => {
    return {type: SET_FRIENDS, friendsData: friendsData}
}
export const setFollowingInProgressActionCreator = (followingStatus, userId) => {
    return {type: SET_FOLLOWING_IN_PROGRESS, followingStatus: followingStatus, userId: userId}
}

let cp = 1
let users = []

export const getUsersThunkCreator = (pageSize, currentPage) => {
    return (dispatch) => {
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

export const followUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgressActionCreator(true, userId))
        axiosFollow(userId).then(data => {
            if(data.resultCode === 0)
                dispatch(followedActionCreator(userId))
            dispatch(setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export const unfollowUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgressActionCreator(true, userId))
        axiosUnfollow(userId).then(data => {
            if(data.resultCode === 0)
                dispatch(unfollowedActionCreator(userId))
            dispatch(setFollowingInProgressActionCreator(false, userId))
        })
    }
}

export default usersReducer