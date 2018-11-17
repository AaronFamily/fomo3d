import * as Types from './actionsTypes'

export const setUserInfo = payload => ({
    type: Types.SET_USER_INFO,
    payload
})

export const resetLoginStatus = payload => ({
    type: Types.SET_LOGIN_STATUS,
    payload
})

export const setTime = payload => ({
    type: Types.SET_TIME,
    payload
})
