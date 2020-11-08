import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'
import createPDF from './createPDF'

const app: Application = express()

app.use(express.static(path.join(__dirname, 'app/build')))
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PW,
  },
})

transporter.verify((error, success) => {
  error ? console.log(error) : console.log(success)
})

app.post('/api/send', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const pdf = await createPDF(request.body)

    const { sendTo, invoiceNumber } = request.body

    const email = {
      to: sendTo,
      bcc: process.env.BCC_EMAIL,
      subject: `Invoice #${invoiceNumber} - Alliance Builders Inc.`,
      text: `See Attached \n\n Robert Martin - President \n Alliance Builders \n 24931 Avonlea Drive \n Chantilly VA 20152`,
      attachments: [
        {
          filename: `alliance_builders_invoice_#${invoiceNumber}.pdf`,
          content: pdf,
        },
      ],
    }

    transporter.sendMail(email, (error) => {
      error
        ? response.status(500).json({
            message: 'Email failed to send!',
          })
        : response.status(200).json({
            message: 'Email successfuly sent!',
          })
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.get('*', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, 'app/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
