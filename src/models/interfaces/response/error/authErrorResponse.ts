/**
 * authen error response
 */
export default interface IAuthErrorRes {
    email?: string                  // email relevant error 
    password?: string               // password relevant error 
    confirmPassword?: string        // confirmPassword relevant error 
    credential?: string             // credential relevant error, exp: "user or pass incorect"
}