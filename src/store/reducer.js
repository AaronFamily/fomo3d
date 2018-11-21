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
    rank: ['', '', ''],
    recency: [],
    time: 0,
    username: sessionStorage.getItem('username') || '',
    zongtouzi: 0,
    language: navigator.language.split('-')[0] || 'zh'
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
        case Types.SET_LANG:
            return { ...state, language: action.payload }
        default:
            return state
    }
}

