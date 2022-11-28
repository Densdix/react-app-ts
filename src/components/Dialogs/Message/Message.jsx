import React from "react";
import s from './../Dialogs.module.css'
import { NavLink } from "react-router-dom";

const Message = ({ text }) => {
    return (
        <div className={s.message}>{text}</div>
    );
}

export default Message;