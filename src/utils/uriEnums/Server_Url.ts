export enum Server_URL {
    base = 'http://localhost:5000',
    resetPass = '/reset-pass',
    createNewPass = '/create-new-pass'
}

export enum Server_URL_Absolute {
    base = Server_URL.base,
    resetPass = base + Server_URL.resetPass,
    createNewPass = base + Server_URL.createNewPass
}