export enum ShopLabUrl {
    base = 'http://localhost:5000',
    reset = '/reset'
}

export enum ShopLabUrl_Absolute {
    base = ShopLabUrl.base,
    reset = base + ShopLabUrl.reset
}