const BASE_URL: string = 'http://127.0.0.1:8000//api'


//Auth
export const LOGIN_URL: string = `${BASE_URL}/users/login`
export const USER_DATA_URL: string = `${BASE_URL}/users/me`
export const GOOGLE_AUTH_URL: string = `${BASE_URL}/users/google-auth`
export const PROFILE_IMG_PRESIGNED_URL = `${BASE_URL}/users/img/presigned`