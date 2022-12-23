import React from "react";
import s from './../Dialogs.module.css'
import { NavLink } from "react-router-dom";

type PropsType = {
    text: string
}

const Message: React.FC<PropsType> = ({ text }) => {
    return (
        <div className={s.message}>{text}</div>
    );
}

export default Message;