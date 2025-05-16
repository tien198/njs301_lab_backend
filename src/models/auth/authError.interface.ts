export default interface IAuthError {
    // confirmPass?: 'confirm password is not same to password'
    // wasExist?: 'user is existed'
    // notFoundUser?: 'Not found user'
    // tokenInvalid?: 'Reset token invalid'
    // tokenExpired?: 'Reset token expired'
    email?: string
    password?: string
    confirmPassword?: string
    credential?: string
}