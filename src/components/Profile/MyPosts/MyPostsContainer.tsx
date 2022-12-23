import React from "react";
import {profileActionsCreators} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reactStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost: profileActionsCreators.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;