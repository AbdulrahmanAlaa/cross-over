/**
 * Contains the key to help get and set info from localstorage
 */
export const LOCAL_STORAGE_PREFIX = 'cross-over-LocalStore.key';

/**
 * contains all json path queries so in case the backend response changes we 
 * only modifies this query rather than the whole app
 */
export const JSON_PATHS = {
    USER: {
        USERNAME: "$.username",
        SESSION_ID:"$.sessionId",
        STATUS:"$.status"
    },
    LOGIN: {
        SUCCESS: {
            TOKEN_TYPE: "$.token_type",
            EXP: "$.exp"
        }
    }
};

/**
 * contains the user info when dealing with storage 
 */
export const USER =  "user"