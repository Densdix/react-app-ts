import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {
    userSignOutThunkCreator
} from "../../redux/authReducer";
import {AppStateType} from "../../redux/reactStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

const HeaderContainer = connect(mapStateToProps,
    {
        setUserLogOut: userSignOutThunkCreator
    })(Header)

export default HeaderContainer