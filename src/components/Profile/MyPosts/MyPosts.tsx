import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormControl} from "../../common/FormsControls/FormsControls";
import {emptyField, maxLength} from "../../../utils/validators";
import {PostDataType} from "../../../redux/profileReducer";

type PropsType = {
    newPostText: string,
    postData: Array<PostDataType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = React.memo(props => {

    let onSubmit = (value: MyPostsDataType) => {
        //ctrl+shift+v
        props.addPost(value.newPostText)
    }
    return (
        <div className={s.postBlock}>
            <h3>My posts</h3>
            <ReduxAddPostForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {props.postData.map(el => <Post msg={el.msg} likesCount={el.likesCount} imgUrl={el.imgUrl}/>)}
            </div>

        </div>
    )

});

const maxLength15 = maxLength(15)

type MyPostsDataType = {
    newPostText: string
}

let AddPostForm: React.FC<InjectedFormProps<MyPostsDataType>> = (props) => {
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

const ReduxAddPostForm = reduxForm<MyPostsDataType>({
    // a unique name for the form
    form: 'posts'
})(AddPostForm)

export default MyPosts;