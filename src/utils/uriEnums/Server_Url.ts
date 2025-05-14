const server = 'http://localhost:5000'

export enum Server_URL {
    base = server,
    login = '/login',
    signup = '/sign-up',
    resetPass = '/reset-pass',
    createResetPassToken = '/create-reset-pass-token'
}

export enum Server_URL_Absolute {
    base = Server_URL.base,
    resetPass = base + Server_URL.resetPass,
    createResetPassToken = base + Server_URL.createResetPassToken
}