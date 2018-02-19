import { environment } from '../../../environments/environment';

/**
 * holds all the Api related url to easy the process when moving in production 
 * or changing the target api url with out cracking the app 
 */
export const API_URLS = {
    'Login': {
        'SESSION_START': environment.baseURL + 'user/auth'
    },
    "LOGOUT": environment.baseURL +"user/logout",
    "VIDEOS": environment.baseURL + "videos",
    "VIDEO": environment.baseURL + "video",
    "RATINGS": environment.baseURL + "video/ratings"
};