import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {
    followedActionCreator, followUserThunkCreator, getUsersThunkCreator,
    setCurrentPageActionCreator, setFollowingInProgressActionCreator, setFriendsActionCreator,
    setUsersActionCreator, setUsersTotalCountActionCreator, toggleFetchingActionCreator,
    unfollowedActionCreator, unfollowUserThunkCreator
} from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import {axiosGetFriends, axiosGetUsers} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getSelectorUserPage, getUsersPage} from "../../redux/selectors/userSelectors";

// const USERS_API_URL = "https://social-network.samuraijs.com/api/1.0/users"

class UsersAPIContainer extends React.Component {
    componentDidMount() {

        this.props.getUsers(this.props.usersPage.pageSize, this.props.usersPage.currentPage)

        // this.props.toggleFetching(true)
        //
        //
        // axiosGetUsers(this.props.usersPage.pageSize, this.props.usersPage.currentPage).then(data => {
        //     this.props.toggleFetching(false)
        //     this.props.setUsers(data.items)
        //     this.props.setUsersTotalCount(data.totalCount)
        // })

        // axios.get(USERS_API_URL + `?count=${this.props.usersPage.pageSize}&page=${this.props.usersPage.currentPage}`, {
        //     withCredentials: true
        // }).then(response => {
        //     this.props.toggleFetching(false)
        //     this.props.setUsers(response.data.items)
        //     this.props.setUsersTotalCount(response.data.totalCount)
        // })
    }

    loadUserPage = (number) => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users?page=" + number).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    loadMoreUsers = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users?page=" + this.props.usersPage.currentPage).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    updateCurrentPage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(this.props.usersPage.pageSize, pageNumber)

        // this.props.toggleFetching(true)
        // this.props.setCurrentPage(pageNumber)
        // axiosGetUsers(this.props.usersPage.pageSize, pageNumber).then(response => {
        //     this.props.toggleFetching(false)
        //     this.props.setUsers(response.items)
        // })

    }

    getFriends = () => {
        axiosGetFriends().then(response => {
            this.props.setFriends(response.items)
        })
    }

    render() {
        console.log("UC render")
        return(
        <>
            {this.props.usersPage.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.usersPage.totalUsersCount}
                   pageSize={this.props.usersPage.pageSize}
                   currentPage={this.props.usersPage.currentPage}
                   updateCurrentPage={this.updateCurrentPage}
                   usersData={this.props.usersPage.usersData}
                   setUnfollow={this.props.setUnfollow}
                   setFollow={this.props.setFollow}
                   friendsData={this.props.usersPage.friendsData}
                   getFriends={this.getFriends}
                   setFollowingInProgress={this.props.setFollowingInProgress}
                   followingElements={this.props.usersPage.followingElements}
                   getUsers={this.props.getUsers}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}

            />
        </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        usersPage: getUsersPage(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setFollow: (userId) => {
            dispatch(followedActionCreator(userId))
        },
        setUnfollow: (userId) => {
            dispatch(unfollowedActionCreator(userId))
        },
        setUsers: (usersData) => {
            dispatch(setUsersActionCreator(usersData))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageActionCreator(currentPage))
        },
        setUsersTotalCount: (totalCount) => {
            dispatch(setUsersTotalCountActionCreator(totalCount))
        },
        toggleFetching: (isFetching) => {
            dispatch(toggleFetchingActionCreator(isFetching))
        }
    }
}

const UserContainer = connect(mapStateToProps,
    {
        setFollow: followedActionCreator,
        setUnfollow: unfollowedActionCreator,
        setUsers: setUsersActionCreator,
        setUsersTotalCount: setUsersTotalCountActionCreator,
        setCurrentPage: setCurrentPageActionCreator,
        toggleFetching: toggleFetchingActionCreator,
        setFriends: setFriendsActionCreator,
        setFollowingInProgress: setFollowingInProgressActionCreator,
        getUsers: getUsersThunkCreator,
        followUser: followUserThunkCreator,
        unfollowUser: unfollowUserThunkCreator
    })(withAuthRedirect(UsersAPIContainer))

export default UserContainer