import {ProfileUserDataType} from "../redux/profileReducer";
import axios, {AxiosResponse} from "axios";
import {LoginFormDataType} from "../components/Login/Login";
import {UserDataType} from "../redux/usersReducer";

const axInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a8fcf76b-1a1b-4343-9697-1a60a9327278'
    }
})

export enum ResultCodes {
    RESPONSE_SUCCESS = 0,
    RESPONSE_ERROR = 1,
}
export enum ResultCodeCaptcha {
    RESPONSE_CAPTCHA_IS_REQUIRED = 10
}

export const authAPI = {
    axiosPostSignIn(formData: LoginFormDataType) {
        type SignInResponseType = {
            resultCode: ResultCodes | ResultCodeCaptcha
            messages: string[]
            data: {
                userId: number
            }
        }
        return axInstance.post(`/auth/login`, {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            captcha: formData.captcha

        }).then((response: AxiosResponse<SignInResponseType>) => {
            console.log("api.js -> axiosPostSignIn", response)
            return response.data
        })
    },

    axiosPostSignOut() {
        type SignOutResponseType = {
            resultCode: ResultCodes
            messages: string[]
            data: {}
        }
        return axInstance.delete(`/auth/login`,).then((response:AxiosResponse<SignOutResponseType>) => {
            console.log("api.js -> axiosPostSignOut", response)
            return response.data
        })
    },

    axiosGetCurrentUserData() {
        type MeResponseType = {
            resultCode: ResultCodes
            messages: string[]
            data: {
                id: number
                email: string
                login: string
            }
        }
        return axInstance.get(`auth/me`).then((response: AxiosResponse<MeResponseType>) => {
            return response.data
        })
    },
    axiosGetCaptcha() {
        type GetCaptchaUrlResponseType = {
            url: string
        }
        return axInstance.get("/security/get-captcha-url").then((response: AxiosResponse<GetCaptchaUrlResponseType>) => {
            console.log("api.js -> axiosGetCaptcha", response)
            return response.data
        })
    }
}

export const usersAPI = {

    axiosGetUsers(pageSize: number, currentPage: number, term: string = "", friend: boolean | null = null) {
        type GetUsersResponseType = {
            items: Array<UserDataType>
            totalCount: number,
            error: string | null
        }
        return axInstance.get(`users?count=${pageSize}&page=${currentPage}&term=${term}&friend=${friend}`)
            .then((response: AxiosResponse<GetUsersResponseType>) => {
                console.log("api.js -> axiosGetUsers", response)
                return response.data
            })
    },
    axiosGetFriends() {
        return axInstance.get(`users?friend=${true}`)
            .then(response => {
                console.log("api.js -> axiosGetFriends", response)
                return response.data
            })
    },
    axiosFollow(userId: number) {
        type FollowResponseType = {
            resultCode: number
            messages: Array<string>,
            data: any
        }
        return axInstance.post(`follow/${userId}`)
            .then((response: AxiosResponse<FollowResponseType>) => {
                console.log("api.js -> axiosFollow", response)
                return response.data
            })
    },

    axiosUnfollow(userId: number) {
        type FollowResponseType = {
            resultCode: number
            messages: Array<string>,
            data: any
        }
        return axInstance.delete(`follow/${userId}`)
            .then((response:AxiosResponse<FollowResponseType>) => {
                console.log("api.js -> axiosUnfollow", response)
                return response.data
            })
    }
}

export const profileAPI = {
    axiosGetUserProfile(userId: number) {
        return axInstance.get(`profile/${userId}`).then((response:AxiosResponse<ProfileUserDataType>)=> {
            console.log("api.js -> axiosGetUserProfile", response)
            return response.data
        })
    },


    axiosPutStatusText(statusText: string) {
        type PutStatusTextResponseType = {
            resultCode: number
            messages: Array<string>,
            data: any
        }
        return axInstance.put("profile/status", {status: statusText})
            .then((response: AxiosResponse<PutStatusTextResponseType>) => {
                return response.data
        })
    },

    axiosGetStatusText(userId: number) {
        return axInstance.get(`profile/status/${userId}`).then(response => {
            console.log("axiosGetStatusText -> ", response)
            return response.data
        })
    },

    axiosPutProfilePhoto(filePhoto: File) {
        type PutProfilePhotoTextResponseType = {
            resultCode: number
            messages: Array<string>,
            data: any
        }
        const formData = new FormData();
        formData.append("image", filePhoto);
        return axInstance.put("/profile/photo", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response: AxiosResponse<PutProfilePhotoTextResponseType>) => {
            return response.data
        })
    },

    axiosPutProfileData(profileData: ProfileUserDataType) {
        type PutProfileDataTextResponseType = {
            resultCode: number
            messages: Array<string>,
            data: any
        }
        return axInstance.put("/profile", profileData)
            .then((response: AxiosResponse<PutProfileDataTextResponseType>) => {
                return response.data
        })
    }

}