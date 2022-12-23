import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import editImg from '../../../assets/images/edit.png'

type PropsType = {
    profileUserStatus : string
    statusTextChange: (value: string) => void
    isCurrentUserProfile: boolean
}

const StatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [tempText, setTempText] = useState(props.profileUserStatus)

    useEffect(() => {
        setTempText(props.profileUserStatus)
    }, [props.profileUserStatus])

    const enableEditMode = () => {
        setEditMode(true)
        // setTempText(props.profileUserStatus)
    }
    const disableEditMode = () => {
        setEditMode(false)
        props.statusTextChange(tempText)
    }
    const changeTempTextStatus = (value: string) => {
        setTempText(value)
    }

    return <>
        {!editMode &&
            <div>
                    <span className={props.profileUserStatus ? s.aboutMe : s.aboutMeEmpty}
                          onClick={props.isCurrentUserProfile ? enableEditMode : undefined}
                    >{props.profileUserStatus !== null ? props.profileUserStatus !== "" ? props.profileUserStatus : "Input your status" : "No status"}</span>
                {props.isCurrentUserProfile &&
                    <img onClick={props.isCurrentUserProfile && enableEditMode} className={s.editImg}
                         src={editImg} alt="edit"/>}
            </div>
        }
        {editMode &&
            <div>
                <input onChange={evt => changeTempTextStatus(evt.target.value)}
                       onKeyDown={evt => evt.code === "Enter" && disableEditMode()}
                       autoFocus={true}
                       onBlur={disableEditMode}
                       value={tempText}
                       maxLength={300}/>
            </div>
        }
    </>
}

export default StatusWithHooks