import PDFDocument from 'pdfkit'

export function createPdf(text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument()
    const buffers: Buffer[] = []
    doc.on('data', (data: Buffer) => buffers.push(data))
    doc.on('end', () => resolve(Buffer.concat(buffers)))
    doc.on('error', reject)
    doc.text(text)
    doc.end()
  })
}
