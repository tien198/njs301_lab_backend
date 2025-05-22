const server = 'http://localhost:5000'

export enum Server_URL {
    base = '/',
    login = '/login',
    signup = '/sign-up',
    resetPass = '/reset-pass',
    createResetPassToken = '/create-reset-pass-token',

    products = '/products',
    product = '/product',

    cart = '/cart',
    addToCart = '/add-to-cart',
    order = '/orders',
    addOrder = '/add-order',

    getInvoice='/get-invoice',

    admin = '/admin',
    addProduct = '/add-product',
    editProduct = '/edit-product',
    deleteProduct = '/delete-product',
}

export enum Server_URL_Absolute {
    base = server,
    resetPass = base + Server_URL.resetPass,
    createResetPassToken = base + Server_URL.createResetPassToken,

    products = base + Server_URL.products,
    product = base + Server_URL.product,

    cart = base + Server_URL.cart,
    addToCart = base + Server_URL.addToCart,

    admin = base + Server_URL.admin,
    adminProducts = base + Server_URL.admin + Server_URL.products,
    adminProduct = base + Server_URL.admin + Server_URL.product,
    addProduct = base + Server_URL.admin + Server_URL.addProduct,
    editProduct = base + Server_URL.admin + Server_URL.editProduct,
    deleteProduct = base + Server_URL.admin + Server_URL.deleteProduct,
}