import React, {useEffect} from "react";
import s from "./Users.module.css"
import noAvatar from "../../assets/images/noavatar.png"
import {createSearchParams, NavLink, useLocation, useNavigate} from "react-router-dom";
import PaginatorWithArrows from "./Paginators/PaginatorWithArrows";
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    unfollowUserThunkCreator,
    usersActionsCreators
} from "../../redux/usersReducer";
import {Field, Form, Formik} from "formik";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector, useAppThunkDispatch} from "../../redux/hooks";

type PropsType = {}

const Users: React.FC<PropsType> = () => {
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const usersData = useAppSelector(state => state.usersPage.usersData)
    const followingElements = useAppSelector(state => state.usersPage.followingElements)
    const filter = useAppSelector(state => state.usersPage.filter)

    const actionDispatch = useAppDispatch()
    const thunkDispatch = useAppThunkDispatch()
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const queryFriend = query.get("friend");
        const queryPage = query.get("page");
        const queryTerm = query.get("term") as string;

        let actualFilter = {...filter}
        let actualPage = currentPage;

        if (queryPage) {
            actualPage = Number(queryPage)
            actionDispatch(usersActionsCreators.setCurrentPageActionCreator(Number(queryPage)))
            console.log("queryPage")
        }

        if (queryTerm) {
            actualFilter = {...actualFilter, term: queryTerm}
            console.log("queryTerm")
        }

        switch (queryFriend) {
            case "null":
                actualFilter = {...actualFilter, friend: null};
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true};
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false};
                break;
            default:
                break;
        }

        if (queryFriend || queryTerm) {
            actionDispatch(usersActionsCreators.setUserSearchFilterActionCreator(actualFilter.term, actualFilter.friend))
        }

        console.log("useEffect1:currentPage", currentPage)
        console.log("User:searchParams", {queryFriend, queryPage, queryTerm})
        getUsers(undefined, actualPage, actualFilter.term, actualFilter.friend)
    }, [])

    useEffect(() => {
        getUsers(pageSize, currentPage, filter.term, filter.friend)
        console.log("useEffect2:currentPage", currentPage)

        let createdSearchParams = createSearchParams({
            page: `${currentPage}`,
            pageSize: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`,
        })
        createdSearchParams.delete("pageSize")
        currentPage === 1 && createdSearchParams.delete("page")
        filter.friend === null && createdSearchParams.delete("friend")
        filter.term === "" && createdSearchParams.delete("term")

        navigate(`/users?${createdSearchParams}`)

    }, [pageSize, currentPage, filter])

    const followUser = (userId: number) => {
        thunkDispatch(followUserThunkCreator(userId))
    }

    const unfollowUser = (userId: number) => {
        thunkDispatch(unfollowUserThunkCreator(userId))
    }

    const updateCurrentPage = (pageNum: number) => {
        actionDispatch(usersActionsCreators.setCurrentPageActionCreator(pageNum))
        getUsers(pageSize, pageNum)
    }

    const getUsers = (pageSize?: number, currentPage?: number, term?: string, friend?: boolean | null) => {
        thunkDispatch(getUsersThunkCreator(pageSize, currentPage, term, friend))
    }

    const setFilter = (term: string, friend: boolean | null) => {
        actionDispatch(usersActionsCreators.setUserSearchFilterActionCreator(term, friend))
    }


    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (<div>
        <UserSearchForm getUsers={getUsers} setFilter={setFilter}/>
        <UserSearchHookForm getUsers={getUsers} setFilter={setFilter}/>
        <PaginatorWithArrows pages={pages}
                             currentPage={currentPage}
                             updateCurrentPage={updateCurrentPage}/>
        {usersData.map(el => <span>
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
                                <button disabled={followingElements.some(id => id === el.id)} onClick={() => {
                                    unfollowUser(el.id)
                                }}>Unfollow</button>

                                : <button disabled={followingElements.some(id => id === el.id)} onClick={() => {
                                    followUser(el.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{el.name}</div>
                            <div>{el.status}</div>
                        </span>
                    </span>
                    <br/>
                </span>)
        }
    </div>)
}

interface MyFormValues {
    term: string
    friend?: string
}

interface IUserSearchForm {
    getUsers: (pageSize?: number, currentPage?: number, term?: string, friend?: boolean | null) => void
    setFilter: (term: string, friend: boolean | null) => void
}

const UserSearchForm: React.FC<IUserSearchForm> = ({getUsers, setFilter}) => {

    const filter = useAppSelector(state => state.usersPage.filter)

    return (
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend)}}
            onSubmit={(values: MyFormValues, {setSubmitting}) => {
                setTimeout(() => {
                    console.log(values)
                    let friend = values.friend === "null" ? null : values.friend === "true"
                    setFilter(values.term, friend)
                    getUsers(undefined, undefined, values.term, friend)
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term" placeholder="Filter users"></Field>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Send (Formik)
                    </button>
                </Form>
            )}
        </Formik>
    )
}

const UserSearchHookForm: React.FC<IUserSearchForm> = ({getUsers, setFilter}) => {


    const filter = useAppSelector(state => state.usersPage.filter)

    const {register, handleSubmit, reset, formState: {errors}} = useForm<MyFormValues>({mode: "onChange"});
    const onSubmit: SubmitHandler<MyFormValues> = data => {
        console.log(data);
        let friend = data.friend === "null" ? null : data.friend === "true"
        setFilter(data.term, friend)
        getUsers(undefined, undefined, data.term, friend)
    }

    useEffect(() => {
        reset(formValues => ({...formValues, friend: String(filter.friend), term: filter.term}))
    }, [filter])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={filter.term} {...register("term", {maxLength: 255})} type="text"
                   placeholder="Filter users"/>
            {errors.term && errors.term.type === "maxLength" && <span>Max length 255 symbols</span>}
            <select id="friend" {...register("friend", {maxLength: 255})}>
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </select>
            <button type="submit">Send (Hook)</button>
        </form>
    )
}

export default Users