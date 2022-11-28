import React from "react";
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {
    setCurrentUserThunkCreator,
    setUserDataActionCreator,
    userSignOutThunkCreator
} from "../../redux/authReducer";
import {axiosGetCurrentUserData} from "../../api/api";

const AUTH_API_URL = "https://social-network.samuraijs.com/api/1.0/auth/me"

class HeaderAPIContainer extends React.Component{
    //poyeh36572@migonom.com

    componentDidMount() {

        //this.props.setCurrentUser()

        // axiosGetCurrentUserData().then(data => {
        //     if(data.resultCode === 0) {
        //         let {id, email, login} = data.data
        //         this.props.setUserData(id, email, login)
        //     }
        // })

        // axios.get(AUTH_API_URL, {withCredentials:true}).then(response => {
        //     if(response.data.resultCode === 0) {
        //         let {id, email, login} = response.data.data
        //         this.props.setUserData(id, email, login)
        //     }
        // })
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

const HeaderContainer = connect(mapStateToProps,
    {
        setUserData : setUserDataActionCreator,
        setCurrentUser: setCurrentUserThunkCreator,
        setUserLogOut: userSignOutThunkCreator
    })(HeaderAPIContainer)

export default HeaderContainer