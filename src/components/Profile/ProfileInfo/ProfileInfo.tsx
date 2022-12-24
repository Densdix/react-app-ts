import React, {ChangeEventHandler, useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import noAvatar from "../../../assets/images/noavatar.png";
import headerBG from "../../../assets/images/Header-Background.jpg"
import Preloader from "../../common/Preloader/Preloader";
import Status from "./Status";
import StatusWithHooks from "./StatusWithHooks";
import editProfileImg from '../../../assets/images/icons8-переключение-камеры-96.png'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormControl} from "../../common/FormsControls/FormsControls";
import {ProfileUserContactsType, ProfileUserDataType} from "../../../redux/profileReducer";

type PropsType = {
    profileUsersData: ProfileUserDataType
    profileUserStatus: string
    profileEditMode: boolean
    statusTextChange: (value: string) => void
    updateProfilePhoto: (filePhoto: any) => void
    saveProfileData: (profileData: ProfileUserDataType) => void
    setProfileEditMode: (isEnabled: boolean) => void
    isCurrentUserProfile: boolean
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    //console.log(props.profileUsersData.photos.small)

    const [isShowingImg, setShowingImg] = useState(false)
    const [editMode, setEditMode] = useState(props.profileEditMode)

    useEffect(() => {
        console.log("ProfileInfo useEffect")
        setEditMode(props.profileEditMode)
    }, [props.profileEditMode])

    const updateProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.updateProfilePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileUserDataType) => {
        props.saveProfileData(formData)
        setEditMode(props.profileEditMode)
    }

    const enableEditMode = () => {
        setEditMode(true)
        props.setProfileEditMode(true)
    }

    if (!props.profileUsersData) {
        return <Preloader/>

    } else {
        console.log("editMode", editMode)
        console.log("props.profileEditMode", props.profileEditMode)
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">22</p>
                            <p className="text-gray-400">Friends</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">10</p>
                            <p className="text-gray-400">Photos</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">89</p>
                            <p className="text-gray-400">Comments</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="w-48 h-48 mx-auto inset-x-0 top-0 absolute -mt-24 flex items-center justify-center">
                            <img className="rounded-full shadow-2xl relative"
                                 src={props.profileUsersData.photos.large != null ? props.profileUsersData.photos.large : noAvatar}
                                 alt=""
                                 onMouseOver={() => setShowingImg(true)}
                                 onMouseLeave={() => setShowingImg(false)}
                            />
                            {props.isCurrentUserProfile && isShowingImg &&
                                <span className={s.imageUpload}>
                                                <label htmlFor="file-input">
                                                    <img className={s.editProfilePhoto}
                                                         src={editProfileImg}
                                                         onMouseOver={() => setShowingImg(true)}
                                                         onMouseLeave={() => setShowingImg(false)}
                                                    />
                                                </label>

                                                <input onChange={updateProfilePhoto} id="file-input" type="file"/>
                                            </span>
                            }
                        </div>
                    </div>


                    {!props.isCurrentUserProfile && <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition hover:-translate-y-0.5"
                        >
                            Follow
                        </button>
                        <button
                            className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition hover:-translate-y-0.5"
                        >
                            Message
                        </button>
                    </div>}
                </div>

                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium text-gray-700">{props.profileUsersData.fullName}</h1>
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
                            <div>{(Object.keys(props.profileUsersData.contacts) as (keyof typeof props.profileUsersData.contacts)[])
                                .map(k => <Contact contactTitle={k}
                                                   contactDescription={props.profileUsersData.contacts[k]}/>)}</div>
                        </div>}
                    {editMode &&
                        <ReduxEditProfileInfoForm initialValues={props.profileUsersData}
                                                  onSubmit={onSubmit}
                                                  contacts={props.profileUsersData.contacts}/>
                    }
                    {!editMode
                        ? <button onClick={enableEditMode}>Edit</button>
                        : undefined}
                </div>

                {/*<div className="mt-12 flex flex-col justify-center">*/}
                {/*    <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range,*/}
                {/*        Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and*/}
                {/*        records all of his own music, giving it a warm, intimate feel with a solid groove structure.*/}
                {/*        An artist of considerable range.</p>*/}
                {/*    <button*/}
                {/*        className="text-indigo-500 py-2 px-4  font-medium mt-4"*/}
                {/*    >*/}
                {/*        Show more*/}
                {/*    </button>*/}
                {/*</div>*/}

            </div>
            // <div>
            //     <div>
            //         <img className={s.header} src={headerBG} width={"100%"} />
            //     </div>
            //     <div className={s.description}>
            //         {/*avatar + descrip*/}
            //         <div>
            //             <img className={s.avatar}
            //                  src={props.profileUsersData.photos.large != null ? props.profileUsersData.photos.large : noAvatar}
            //                  alt="photo"
            //                  onMouseOver={()=> setShowingImg(true)}
            //                  onMouseLeave={()=> setShowingImg(false)}
            //             />
            //             {props.isCurrentUserProfile && isShowingImg &&
            //                 <span className={s.imageUpload}>
            //                     <label htmlFor="file-input">
            //                         <img className={s.editProfilePhoto}
            //                              src={editProfileImg}
            //                              onMouseOver={()=> setShowingImg(true)}
            //                              onMouseLeave={()=> setShowingImg(false)}
            //                         />
            //                     </label>
            //
            //                     <input onChange={updateProfilePhoto} id="file-input" type="file"/>
            //                 </span>
            //             }
            //             {/*{props.isCurrentUserProfile && <input onChange={updateProfilePhoto} type="file" name="photo" id="photo"/>}*/}
            //         </div>
            //         <StatusWithHooks profileUserStatus={props.profileUserStatus}
            //                 statusTextChange={props.statusTextChange}
            //                 isCurrentUserProfile={props.isCurrentUserProfile}/>
            //         {!editMode &&
            //             <div>
            //             <div><b>Full Name</b>: {props.profileUsersData.fullName}</div>
            //             <div><b>About Me</b>: {props.profileUsersData.aboutMe}</div>
            //             <div><b>Job
            //                 Status</b>: {props.profileUsersData.lookingForAJob ? "Looking for a job" : "Have a job already"}
            //             </div>
            //             {props.profileUsersData.lookingForAJob &&
            //                 <div><b>My Skills</b>: {props.profileUsersData.lookingForAJobDescription}
            //                 </div>}
            //             <br/>
            //             <div><b>Contacts</b></div>
            //             <div>{(Object.keys(props.profileUsersData.contacts) as (keyof typeof props.profileUsersData.contacts)[])
            //                 .map(k => <Contact contactTitle={k}
            //                                    contactDescription={props.profileUsersData.contacts[k]}/>)}</div>
            //         </div>}
            //         {editMode &&
            //             <ReduxEditProfileInfoForm initialValues={props.profileUsersData}
            //                                  onSubmit={onSubmit}
            //                                  contacts={props.profileUsersData.contacts}/>
            //         }
            //         {!editMode
            //             ? <button onClick={enableEditMode}>Edit</button>
            //             : undefined}
            //     </div>
            //
            // </div>
        )
    }

}

type ProfileInfoFormOwnPropsType = {
    contacts: ProfileUserContactsType
}

let EditProfileInfoForm: React.FC<InjectedFormProps<ProfileUserDataType, ProfileInfoFormOwnPropsType> & ProfileInfoFormOwnPropsType> = (props) => {
    console.log("EditProfileInfoForm", props)

    return (
        <form onSubmit={props.handleSubmit}>
            <div><b>Full Name</b>: <Field disabled={true} name="fullName" component="input"></Field></div>
            <div><b>About Me</b>: <Field name="aboutMe" component="input"></Field></div>
            <div><b>Job Status</b>:<Field name="lookingForAJob" component="input" type="checkbox"/>lookingForAJob</div>
            <div><b>My Skills</b>:<Field name="lookingForAJobDescription" component="input"></Field></div>
            <br/>
            <div><b>Contacts</b></div>
            <div>{Object.keys(props.contacts)
                .map(k => <div>
                    <div style={{float: "left"}}><b>{k}:</b></div>
                    <Field component={FormControl} name={`contacts.${k}`} typefield="input"></Field></div>)}</div>
            {props.error && <div className={s.errorText}>{props.error}</div>}
            <div>
                <button type="submit">Save & Close</button>
            </div>
        </form>
    )
}

const ReduxEditProfileInfoForm = reduxForm<ProfileUserDataType, ProfileInfoFormOwnPropsType>({
    form: "profileInfo"
    // initialValues: {
    //     fullName: "myFirstName"
    // }
})(EditProfileInfoForm)

export type ProfileInfoFormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

type ContactType = {
    contactTitle: string
    contactDescription: string | null

}
const Contact: React.FC<ContactType> = ({contactTitle, contactDescription}) => {
    return (
        <div><b>{`${contactTitle}`}</b> : {`${contactDescription ? contactDescription : ""}`}</div>
    )
}

export default ProfileInfo;