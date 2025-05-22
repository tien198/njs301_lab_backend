import type { IOrder } from "../../models/interfaces/base/order.ts"

export default function pdfInvoice(doc: PDFKit.PDFDocument, order: IOrder) {
    // Tiêu đề chính
    doc.fontSize(20).text("✔ Order Invoice", { align: "center" })
    doc.moveDown(1.5)

    // Thông tin đơn hàng
    doc.fontSize(12).text(`Order ID: ${order._id.toString()}`)
    doc.text(`User ID: ${order.userRef.toString()}`)
    doc.moveDown(1)

    // Danh sách sản phẩm
    doc.fontSize(16).text("Items:", { underline: true })
    doc.moveDown(0.5)

    order.items.forEach((item, index) => {
        const { product, quantity } = item
        const subtotal = product.price * Number(quantity)

        doc.font("Helvetica-Bold").fontSize(12).text(`${index + 1}. ${product.title}`)
        doc.font("Helvetica").fontSize(11)
        doc.text(`   Description: ${product.description}`, { lineGap: 2 })
        doc.text(`   Price: $${product.price.toFixed(2)} x ${quantity}`, { lineGap: 2 })
        doc.text(`   Subtotal: $${subtotal.toFixed(2)}`, { lineGap: 2 })

        doc.moveDown(0.8)
        doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).strokeColor("#ccc").stroke()
        doc.moveDown(0.8)
    })

    // Tổng cộng
    doc.moveDown(1)
    doc.font("Helvetica-Bold").fontSize(14).text(`Total: $${order.total.toFixed(2)}`, {
        align: "right",
        underline: true
    })
}
