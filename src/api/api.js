import axios from "axios";

const axInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a8fcf76b-1a1b-4343-9697-1a60a9327278'
    }
})

export const axiosGetUsers = (pageSize, currentPage) => {
    return axInstance.get(`users?count=${pageSize}&page=${currentPage}`)
        .then(response => {
            console.log("api.js -> axiosGetUsers", response)
            return response.data})
}

export const axiosGetFriends = () => {
    return axInstance.get(`users?friend=${true}`)
        .then(response => {
            console.log("api.js -> axiosGetFriends", response)
            return response.data})
}

export const axiosFollow = (userId) => {
    return axInstance.post(`follow/${userId}`)
        .then(response => {
            console.log("api.js -> axiosFollow", response)
            return response.data})
}

export const axiosUnfollow = (userId) => {
    return axInstance.delete(`follow/${userId}`)
        .then(response => {
            console.log("api.js -> axiosUnfollow", response)
            return response.data})
}

export const axiosGetUserProfile = (userId) => {
    return axInstance.get(`profile/${userId}`).then(response => {
        console.log("api.js -> axiosGetUserProfile", response)
        return response.data
    })
}

export const axiosGetCurrentUserData = () => {
    return axInstance.get("auth/me").then(response => {
        return response.data
    })
}

export const axiosPutStatusText = (statusText) => {
    return axInstance.put("profile/status", {status: statusText}).then(response => {
        return response.data
    })
}

export const axiosGetStatusText = (userId) => {
    return axInstance.get(`profile/status/${userId}`).then(response => {
        console.log("axiosGetStatusText -> ", response)
        return response.data
    })
}

export const axiosPostSignIn = (formData) => {
    return axInstance.post(`/auth/login`, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        captcha: formData.captcha

    }).then(response => {
            console.log("api.js -> axiosPostSignIn", response)
            return response.data})
}

export const axiosPostSignOut = () => {
    return axInstance.delete(`/auth/login`, ).then(response => {
        console.log("api.js -> axiosPostSignOut", response)
        return response.data})
}

export const axiosPutProfilePhoto = (filePhoto) => {
    const formData = new FormData();
    formData.append("image", filePhoto);
    return axInstance.put("/profile/photo", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data
    })
}

export const axiosPutProfileData = (profileData) => {
    return axInstance.put("/profile", profileData).then(response => {
        return response.data
    })
}

export const axiosGetCaptcha = () => {
    return axInstance.get("/security/get-captcha-url").then(response => {
            console.log("api.js -> axiosGetCaptcha", response)
            return response.data})
}