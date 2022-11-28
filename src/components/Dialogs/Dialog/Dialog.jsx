import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const Dialog = ({name, id}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${id}`}
                     className={({isActive}) => isActive ? s.activeLink : undefined}>{name}
            </NavLink>
        </div>
    );
}

export default Dialog;