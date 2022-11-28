import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import noAvatar from "../../../assets/images/noavatar.png";
import headerBG from "../../../assets/images/Header-Background.jpg"
import Preloader from "../../common/Preloader/Preloader";
import Status from "./Status";
import StatusWithHooks from "./StatusWithHooks";
import editProfileImg from '../../../assets/images/icons8-переключение-камеры-96.png'
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../../common/FormsControls/FormsControls";

const ProfileInfo = (props) => {
    //console.log(props.profileUsersData.photos.small)

    const [isShowingImg, setShowingImg] = useState(false)
    const [editMode, setEditMode] = useState(props.profileEditMode)

    useEffect(() => {
        console.log("ProfileInfo useEffect")
        setEditMode(props.profileEditMode)
    }, [props.profileEditMode])

    const updateProfilePhoto = (e) => {
        if(e.target.files){
            console.log(e.target.files[0])
            props.updateProfilePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfileData(formData)
        setEditMode(props.profileEditMode)
    }

    const enableEditMode = () => {
        setEditMode(true)
        props.setProfileEditMode(true)
    }

    if(!props.profileUsersData){
        return <Preloader/>

    }
    else{
        console.log("editMode", editMode)
        console.log("props.profileEditMode", props.profileEditMode)
        return (
            <div>
                <div>
                    <img className={s.header} src={headerBG} width={"100%"} />
                </div>
                <div className={s.description}>
                    {/*avatar + descrip*/}
                    <div>
                        <img className={s.avatar}
                             src={props.profileUsersData.photos.large != null ? props.profileUsersData.photos.large : noAvatar}
                             alt="photo"
                             onMouseOver={()=> setShowingImg(true)}
                             onMouseLeave={()=> setShowingImg(false)}
                        />
                        {props.isCurrentUserProfile && isShowingImg &&
                            <span className={s.imageUpload}>
                                <label htmlFor="file-input">
                                    <img className={s.editProfilePhoto}
                                         src={editProfileImg}
                                         onMouseOver={()=> setShowingImg(true)}
                                         onMouseLeave={()=> setShowingImg(false)}
                                    />
                                </label>

                                <input onChange={updateProfilePhoto} id="file-input" type="file"/>
                            </span>
                        }
                        {/*{props.isCurrentUserProfile && <input onChange={updateProfilePhoto} type="file" name="photo" id="photo"/>}*/}
                    </div>
                    <StatusWithHooks profileUserStatus={props.profileUserStatus}
                            statusTextChange={props.statusTextChange}
                            isCurrentUserProfile={props.isCurrentUserProfile}/>
                    {!editMode &&
                        <div>
                        <div><b>Full Name</b>: {props.profileUsersData.fullName}</div>
                        <div><b>About Me</b>: {props.profileUsersData.aboutMe}</div>
                        <div><b>Job
                            Status</b>: {props.profileUsersData.lookingForAJob ? "Looking for a job" : "Have a job already"}
                        </div>
                        {props.profileUsersData.lookingForAJob &&
                            <div><b>My Skills</b>: {props.profileUsersData.lookingForAJobDescription}
                            </div>}
                        <br/>
                        <div><b>Contacts</b></div>
                        <div>{Object.keys(props.profileUsersData.contacts)
                            .map(k => <Contact contactTitle={k}
                                               contactDescription={props.profileUsersData.contacts[k]}/>)}</div>
                    </div>}
                    {editMode &&
                        <EditProfileInfoForm initialValues={props.profileUsersData}
                                             onSubmit={onSubmit}
                                             setEditMode={setEditMode}
                                             contacts={props.profileUsersData.contacts}/>
                    }
                    {!editMode
                        ? <button onClick={enableEditMode}>Edit</button>
                        : undefined}
                </div>

            </div>
        )
    }

}

let EditProfileInfoForm = (props) => {
    console.log("EditProfileInfoForm", props)

    return (
        <form onSubmit={props.handleSubmit}>
            <div><b>Full Name</b>: <Field disabled={true} name="fullName" component="input"></Field></div>
            <div><b>About Me</b>: <Field name="aboutMe" component="input"></Field></div>
            <div><b>Job Status</b>:<Field name="lookingForAJob" component="input" type="checkbox" />lookingForAJob</div>
            <div><b>My Skills</b>:<Field name="lookingForAJobDescription" component="input" ></Field></div>
            <br/><div><b>Contacts</b></div>
            <div>{Object.keys(props.contacts)
                .map(k => <div><div style={{float: "left"}}><b>{k}:</b></div><Field component={FormControl} name={`contacts.${k}`} typefield="input"></Field></div>)}</div>
            {props.error && <div className={s.errorText}>{props.error}</div>}
            <div>
                <button type="submit">Save & Close</button>
            </div>
        </form>
    )
}

EditProfileInfoForm = reduxForm({
        form : "profileInfo"
    // initialValues: {
    //     fullName: "myFirstName"
    // }
})(EditProfileInfoForm)

const Contact = ({contactTitle, contactDescription}) => {
    return (
        <div><b>{`${contactTitle}`}</b> : {`${contactDescription ? contactDescription : ""}`}</div>
    )
}

export default ProfileInfo;