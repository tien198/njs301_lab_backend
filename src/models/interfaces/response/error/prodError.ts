/**
 * Product errors response
 */
export default interface IProdError {
    // validate input
    prodId?: string
    title?: string
    price?: string
    image?: string
    description?: string

    // query form database
    notFound?: string
}