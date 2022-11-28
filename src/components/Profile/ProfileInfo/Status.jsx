import React from "react";
import s from './ProfileInfo.module.css'
import editImg from '../../../assets/images/edit.png'

class Status extends React.Component {

    state = {
        editMode: false,
        tempText: this.props.profileUserStatus
    }

    enableEditMode = () => {
        console.log("enableEditMode")
        this.setState({
            editMode: true,
            tempText: this.props.profileUserStatus
        })
    }

    disableEditMode() {
        console.log("disableEditMode")
        this.setState({
            editMode: false,
            // tempText: this.props.profileUserStatus
        })
        this.props.statusTextChange(this.state.tempText)
    }

    changeTempTextStatus(value) {
        this.setState({
            tempText: value
        })
    }

    render() {
        return <>
            {!this.state.editMode &&
                <div>
                    <span className={this.props.profileUserStatus ? s.aboutMe : s.aboutMeEmpty}
                          onClick={this.props.isCurrentUserProfile && this.enableEditMode}
                    >{this.props.profileUserStatus !== null ? this.props.profileUserStatus !== "" ? this.props.profileUserStatus : "Input your status" : "No status"}</span>
                    {this.props.isCurrentUserProfile &&
                        <img onClick={this.props.isCurrentUserProfile && this.enableEditMode} className={s.editImg}
                             src={editImg} alt="edit"/>}
                </div>
            }
            {this.state.editMode &&
                <div>
                    <input onChange={evt => this.changeTempTextStatus(evt.target.value)}
                           onKeyDown={evt => evt.code === "Enter" && this.disableEditMode()}
                           autoFocus={true}
                           onBlur={this.disableEditMode.bind(this)}
                           value={this.state.tempText}
                           maxLength={300}/>
                </div>
            }
        </>
    }
}

export default Status