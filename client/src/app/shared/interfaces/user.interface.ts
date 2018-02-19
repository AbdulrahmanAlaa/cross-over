/**
 * user object in storage service thats recieved from the backend
 */
export interface User {
    username: string;
    password: string;
    sessionId:string;
}