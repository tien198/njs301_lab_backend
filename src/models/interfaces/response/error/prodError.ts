/**
 * Product errors response
 */
export default interface IProdError {
    // validate input
    prodId?: string
    title?: string
    price?: string
    imageUrl?: string
    description?: string

    // query form database
    notFound?: string
}