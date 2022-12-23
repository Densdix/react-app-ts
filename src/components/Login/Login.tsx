import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {setCurrentUserThunkCreator, userSignInThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {emptyField} from "../../utils/validators";
import {FormControl} from "../common/FormsControls/FormsControls";
import s from "../common/FormsControls/FormControls.module.css";
import {AppStateType} from "../../redux/reactStore";

let LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({captchaUrl, error, handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <div><Field component={FormControl} validate={[emptyField]} placeholder="Email"  typefield="input" type="text" name="email" id="email"/></div>
        <div><Field component={FormControl} validate={[emptyField]} placeholder="Password" typefield="input" type="password" name="password" id="password"/></div>
        <div><Field component="input" type="checkbox" name="rememberMe"/>remember me</div>

        {error && <div className={s.errorText}>{error}</div>}
        {captchaUrl &&
            <div>
                <div><img style={{width: "175px"}} src={captchaUrl} alt="captcha"/></div>
                <div><Field component={FormControl} placeholder="Captcha" typefield="input" type="text" name="captcha"/></div>
            </div>
        }
        <div> <button type="submit">Submit</button></div>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({
    // a unique name for the form
    form: "login"
})(LoginForm)

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormDataType) => {
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
                <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
                <div>
                    <br/>

                </div>
            </div>
            : <Navigate to="/profile"/>}
        </>
    )

}

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    userSignIn: (formData: LoginFormDataType) => void
    setCurrentUser: () => void
}

export type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?:string
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

const LoginContainer = connect(mapStateToProps, {
    userSignIn: userSignInThunkCreator,
    setCurrentUser: setCurrentUserThunkCreator
})(Login)


export default LoginContainer