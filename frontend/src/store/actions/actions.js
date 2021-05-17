import * as ACTION_TYPES from './action_types'


export const login_success = (token, userData) => {
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS,
        token: token,
        userData: userData,
        // id: userData.id,
        // username: userData.username,
        // email: userData.email,
        // first_name: userData.first_name,
        // last_name: userData.last_name,
        // address: userData.address,
        // is_superuser: userData.is_superuser,
        // date_joined: userData.date_joined,
        // last_login: userData.last_login,
        // allergies: userData.allergies 
    }
}

export const register_profile = () => {
    return {
        type: ACTION_TYPES.REGISTER_PROFILE,
    }
}

export const logout = () => {
    return {
        type: ACTION_TYPES.LOGOUT,
        token: null
    }
}

