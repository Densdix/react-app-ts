import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileUserDataType} from "../../redux/profileReducer";

type PropsType = {
    profileUsersData: ProfileUserDataType
    profileUserStatus: string
    profileEditMode: boolean
    statusTextChange: (value: string) => void
    updateProfilePhoto: (filePhoto: any) => void
    saveProfileData: (profileData: ProfileUserDataType) => void
    setProfileEditMode: (isEnabled: boolean) => void
    match: any
}

const Profile: React.FC<PropsType> = (props) => {
    console.log("Profile")
    return (
        <div className="p-4">
            <div className="p-8 bg-white shadow mt-24">
                <ProfileInfo profileUsersData={props.profileUsersData}
                             profileUserStatus={props.profileUserStatus}
                             profileEditMode={props.profileEditMode}
                             statusTextChange={props.statusTextChange}
                             updateProfilePhoto={props.updateProfilePhoto}
                             saveProfileData={props.saveProfileData}
                             setProfileEditMode={props.setProfileEditMode}
                             isCurrentUserProfile={!props.match.params.userId}/>
                <MyPostsContainer/>
            </div>
        </div>
    )
}

export default Profile;