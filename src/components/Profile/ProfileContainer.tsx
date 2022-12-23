import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    updateStatusTextThunkCreator,
    setUserProfileThunkCreator,
    setUserStatusThunkCreator,
    updateProfilePhotoThunkCreator,
    saveProfileDataThunkCreator, ProfileUserDataType, profileActionsCreators
} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getUserID} from "../../redux/selectors/profileSelectors";
import {AppStateType} from "../../redux/reactStore";

export function withRouter(Children: any){
    return(props: any)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

type StatePropsType = {
    userId: number
    profileUsersData: ProfileUserDataType,
    profileUserStatus: string,
    profileEditMode: boolean,
}

type DispatchPropsType = {
    setUserProfile: (userId: number) => void
    setUserStatus: (userId: number) => void
    statusTextChange: (value: string) => void
    updateProfilePhoto: (filePhoto: any) => void
    saveProfileData: (profileData: ProfileUserDataType) => void
    setProfileEditMode: (isEnabled: boolean) => void
}

type OwnPropsType = {
    match: any
}

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType

class ProfileAPIContainer extends React.Component<PropsType> {

    updateUserProfile() {
        let userId = this.props.match.params.userId
        //if(!userId) userId = 2

        if(!userId) {
            userId = this.props.userId
        }

        this.props.setUserProfile(userId)
        this.props.setUserStatus(userId)
    }

    componentDidMount() {
        console.log("ProfileAPIContainer componentDidMount")
        this.updateUserProfile()

        // axiosGetUserProfile(userId).then(data => {
        //     this.props.updateProfileUser(data)
        // })
    }

    componentDidUpdate(prevProps:PropsType , prevState: PropsType) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.updateUserProfile()
            console.log("ProfileAPIContainer componentDidUpdate")
        }

    }

    render() {
        // if(!this.props.isAuth) return <Navigate to="/login"/>
        return <Profile
            profileEditMode={this.props.profileEditMode}
            profileUsersData={this.props.profileUsersData}
            profileUserStatus={this.props.profileUserStatus}
            setProfileEditMode={this.props.setProfileEditMode}
            updateProfilePhoto={this.props.updateProfilePhoto}
            statusTextChange={this.props.statusTextChange}
            saveProfileData={this.props.saveProfileData}
            match={this.props.match}
        />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return{
        //profilePage: state.profilePage,
        profileUsersData: state.profilePage.profileUserData,
        profileUserStatus: state.profilePage.profileUserStatus,
        //isCurrentUserProfile: !state.match.params.userId,
        profileEditMode: state.profilePage.profileEditMode,
        userId: getUserID(state)
    }
}

const ProfileContainer = connect(mapStateToProps,
    {
        setUserProfile: setUserProfileThunkCreator,
        setUserStatus: setUserStatusThunkCreator,
        updateProfileUser: profileActionsCreators.updateProfileUserActionCreator,
        statusTextChange: updateStatusTextThunkCreator,
        updateProfilePhoto: updateProfilePhotoThunkCreator,
        saveProfileData: saveProfileDataThunkCreator,
        setProfileEditMode: profileActionsCreators.isProfileEditModeEnabled
    })(withAuthRedirect(withRouter(ProfileAPIContainer)))

export default ProfileContainer