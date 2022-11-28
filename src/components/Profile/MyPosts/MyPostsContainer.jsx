import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// const SuperMyPostsContainer = (props) => {
//
//     let state = props.store.getState()
//
//     let addPost = () => {
//         //props.addPost()
//         props.store.dispatch(addPostActionCreator())
//     }
//
//     let onPostChange = (text) => {
//         //let text = newPostElement.current.value
//         //props.updateNewText(text)
//         //console.log(text)
//         props.store.dispatch(updateNewPostTextActionCreator(text))
//     }
//
//     return (
//         <MyPosts newPostText={state.profilePage.newPostText}
//                  postData={state.profilePage.postData}
//                  addPost={addPost}
//                  updateNewText={onPostChange}
//         />
//     )
//
// }

let mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: () => {
//             dispatch(addPostActionCreator())
//         },
//         updateNewText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text))
//         }
//     }
// }

const MyPostsContainer = connect(mapStateToProps, {
    addPost: addPostActionCreator
})(MyPosts)

export default MyPostsContainer;