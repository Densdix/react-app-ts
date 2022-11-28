import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../../common/FormsControls/FormsControls";
import {emptyField, maxLength} from "../../../utils/validators";

const MyPosts = React.memo(props => {

    let newPostElement = React.createRef();

    let onSubmit = (value) => {
        //ctrl+shift+v
        props.addPost(value.newPostText)
    }

    let addPost = () => {
        props.addPost()
        //props.dispatch(addPostActionCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewText(text)
        //props.dispatch(updateNewPostTextActionCreator(text))
    }

    console.log("MyPosts")

    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {props.postData.map(el => <Post msg={el.msg} likesCount={el.likesCount} imgUrl={el.imgUrl}/>)}
            </div>

        </div>
    )

});

const maxLength15 = maxLength(15)

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field validate={[maxLength15, emptyField]}
                        typefield={"textarea"}
                        component={FormControl}
                        placeholder="Input post"
                        name="newPostText"/></div>
            <div>
                <button>Add Post</button>
                {/*<button>clear</button>*/}
            </div>
        </form>
    )
}

AddPostForm = reduxForm({
    // a unique name for the form
    form: 'posts'
})(AddPostForm)

export default MyPosts;