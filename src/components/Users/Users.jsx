import React from "react";
import s from "./Users.module.css"
import noAvatar from "../../assets/images/noavatar.png"
import {NavLink} from "react-router-dom";
import Paginator from "./Paginators/Paginator";
import PaginatorWithArrows from "./Paginators/PaginatorWithArrows";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (<div>
        <PaginatorWithArrows pages={pages}
                   currentPage={props.currentPage}
                   updateCurrentPage={props.updateCurrentPage}/>
        {props.usersData.map(el => <span>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + el.id}>
                            <img
                                className={s.avatar}
                                src={el.photos.small != null ? el.photos.small : noAvatar}
                                alt="img"/>
                            </NavLink>
                        </div>
                        <div>
                            {el.followed ?
                                <button disabled={props.followingElements.some(id => id === el.id)} onClick={() => {

                                    props.unfollowUser(el.id)

                                    // props.setFollowingInProgress(true, el.id)
                                    // axiosUnfollow(el.id).then(data => {
                                    //     if(data.resultCode === 0)
                                    //         props.setUnfollow(el.id)
                                    //     props.setFollowingInProgress(false, el.id)
                                    // })
                                }}>Unfollow</button>

                                : <button disabled={props.followingElements.some(id => id === el.id)} onClick={() => {

                                    props.followUser(el.id)

                                    // props.setFollowingInProgress(true, el.id)
                                    // axiosFollow(el.id).then(data => {
                                    //     if(data.resultCode === 0)
                                    //         props.setFollow(el.id)
                                    //     props.setFollowingInProgress(false, el.id)
                                    // })
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{el.name}</div>
                            <div>{el.status}</div>
                        </span>
                        <span>
                            <div>{"el.location.city"}</div><div>{"el.location.country"}</div>
                        </span>
                    </span>
                </span>)
        }
        {/*<div>*/}
        {/*    <button onClick={props.loadMoreUsers}>Load More</button>*/}
        {/*</div>*/}
        <br/>
        <button onClick={props.getFriends}>Get friends</button>
        <div>
            {props.friendsData.map(el => <span>{el.id + " "}</span>)}
        </div>
    </div>)
}

export default Users