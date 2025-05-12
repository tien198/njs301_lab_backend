import path from 'path'

export const mainPath = () => path.dirname(require.main!.filename)

export const prodsDataPath = () => mainPath() + '/data/products.json'

export const cartsDataPath = () => mainPath() + '/data/carts.json'