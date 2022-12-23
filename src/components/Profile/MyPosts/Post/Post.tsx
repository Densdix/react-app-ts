import React from "react";
import s from './Post.module.css'

type PropsType = {
    msg: string,
    likesCount: number,
    imgUrl: string
}

const Post: React.FC<PropsType> = ({msg, likesCount, imgUrl}) => {
    //debugger
    return (
        <div className={s.item}>
            <img src={imgUrl}/>
            {msg}
            <span className={s.likes}> {likesCount}</span>
        </div>
    )
}

export default Post;