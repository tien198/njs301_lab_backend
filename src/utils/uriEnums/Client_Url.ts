const client = 'http://localhost:3000'

export enum Client_URL {
    base = client,
    authen = '/authen/',
    login = 'login',
    signup = 'sign-up',
    logout = 'logout',
    resetPassword = 'reset-password',
    testCookie = 'test-cookie',

    admin = '/admin/',
    products = 'products',
    addProduct = 'add-product',
    editProduct = 'edit-product'
}

export enum Client_URL_Absolute {
    base = client,
    login = base + Client_URL.authen + Client_URL.login,
    signup = base + Client_URL.authen + Client_URL.signup,
    logout = base + Client_URL.authen + Client_URL.logout,
    resetPassword = base + Client_URL.authen + Client_URL.resetPassword,
    testCookie = base + Client_URL.authen + Client_URL.testCookie,



    admin = Client_URL.admin,
    products = admin + Client_URL.products,
    addProduct = admin + Client_URL.addProduct,
    editProduct = admin + Client_URL.editProduct
}
