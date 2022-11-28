import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {setCurrentUserThunkCreator, userSignInThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {emptyField} from "../../utils/validators";
import {FormControl} from "../common/FormsControls/FormsControls";
import s from "../common/FormsControls/FormControls.module.css";

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field component={FormControl} validate={[emptyField]} placeholder="Email" typefield="input" type="text" name="email" id="email"/></div>
        <div><Field component={FormControl} validate={[emptyField]} placeholder="Password" typefield="input" type="password" name="password" id="password"/></div>
        <div><Field component="input" type="checkbox" name="rememberMe"/>remember me</div>

        {props.error && <div className={s.errorText}>{props.error}</div>}
        {props.captchaUrl &&
            <div>
                <div><img style={{width: "175px"}} src={props.captchaUrl} alt="captcha"/></div>
                <div><Field component={FormControl} placeholder="Captcha" typefield="input" type="text" name="captcha"/></div>
            </div>
        }
        <div> <button type="submit">Submit</button></div>
    </form>
}

LoginForm = reduxForm({
    // a unique name for the form
    form: "login"
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.userSignIn(formData)
        console.log("formData",formData)
    }

    return (
        <>
            {!props.isAuth ?
            <div>
                <div style={{background: '#eed036', width:'fit-content', paddingInline: '5px', borderRadius: '5px'}}>
                    <h4>Email and Password for testing social network</h4>
                    <p>Email: <b>free@samuraijs.com</b></p>
                    <p>Password: <b>free</b></p>
                </div>
                <div>Sign In</div>
                <LoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
                <div>
                    <br/>

                </div>
            </div>
            : <Navigate to="/profile"/>}
        </>
    )

}

class LoginAPIContainer extends React.Component {

    render() {
        return <Login {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return{
        userId: state.auth.userId,
        email: state.auth.email,
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        captchaUrl: state.auth.captchaUrl
    }
}

const LoginContainer = connect(mapStateToProps, {
    userSignIn: userSignInThunkCreator,
    setCurrentUser: setCurrentUserThunkCreator
})(LoginAPIContainer)


export default LoginContainer