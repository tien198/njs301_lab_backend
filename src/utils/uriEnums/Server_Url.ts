const server = 'http://localhost:5000'

export enum Server_URL {
    base = server,
    login = '/login',
    signup = '/sign-up',
    resetPass = '/reset-pass',
    createResetPassToken = '/create-reset-pass-token',

    admin = '/admin',
    products = '/products',
    product = '/product',
    addProduct = '/add-product',
    editProduct = '/edit-product',
    deleteProduct = '/delete-product',
}

export enum Server_URL_Absolute {
    base = '/',
    resetPass = base + Server_URL.resetPass,
    createResetPassToken = base + Server_URL.createResetPassToken,

    admin = base + Server_URL.admin,
    products = base + Server_URL.products,
    product = base + Server_URL.product,
    addProduct = base + Server_URL.addProduct,
    editProduct = base + Server_URL.editProduct,
    deleteProduct = base + Server_URL.deleteProduct,
}