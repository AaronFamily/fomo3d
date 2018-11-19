import * as Types from './actionsTypes'

const initialState = {
    address: '',
    dierming: 0,
    diyiming: 0,
    email: '',
    friend1: 0,
    friend2: 0,
    huanlebi: 0,
    id: 0,
    inviterCode: '',
    inviterId: 0,
    isLogin: true,
    jiangchi: 0,
    lunshu: 0,
    rank: ['???', '???', '???'],
    recency: [],
    time: 0,
    username: '',
    zongtouzi: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_USER_INFO:
            return { ...state, ...action.payload }
        case Types.SET_LOGIN_STATUS:
            return { ...state, isLogin: action.payload }
        case Types.SET_TIME:
            return { time: action.payload }
        case Types.RESET_USER:
            return initialState
        default:
            return state
    }
}

