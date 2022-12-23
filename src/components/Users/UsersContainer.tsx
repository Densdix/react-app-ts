import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {useAppSelector} from "../../redux/hooks";

const UsersContainer = () => {

    const isFetching = useAppSelector(state => state.usersPage.isFetching)

    console.log("UC render")
    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}

export default withAuthRedirect(UsersContainer)