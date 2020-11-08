import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

import { Invoice } from './app/src/config'

const htmlPath = path.resolve('./invoice.html')

const createHTMLFile = (invoice: Invoice) => {
  const {
    jobsiteName,
    modelName,
    elevationName,
    today,
    invoiceNumber,
    lotNumber,
    totalFormatted,
    invoiceItems,
  } = invoice

  const tableRows = invoiceItems
    .map((item) => {
      return `  
            <tr>
                <td>${item.option}</td>
                <td>${item.description}</td>
                <td>${item.priceFormatted}</td>
            </tr>
        `
    })
    .join('')

  const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Alliance Builders Invoice</title>
          <link rel="stylesheet" type="text/css" href="./app/src/styles/invoice.css">      
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <style>
              .invoice {
                  padding-top: 4rem;
              }
          </style>
      </head>
      
      <body>
      
          <div class="invoice">
              <h1 class="invoice-title">Invoice</h1>
      
              <div class="invoice-tophead">
                  <div>
                      <h6>Invoice Number</h6><span>${invoiceNumber}</span>
                  </div>
                  <div>
                      <h6>Date of Issue</h6><span>${today}</span>
                  </div>
              </div>
      
              <div class="invoice-info">
                  <div class="invoice-info-split">
                      <h6>Billed To</h6>
                      <p>Toll Integrated Systems</p>
                      <h6>For</h6>
                      <p>${jobsiteName} # ${lotNumber}</p>
                      <h6>Model/Elevation</h6>
                      <p>${modelName}/${elevationName}</p>
                  </div>
                  <div class="invoice-info-split">
                      <h6><b style="color: rgb(33, 37, 41);">Alliance Builders Inc.</b></h6>
                      <p>24931 Avonlea Drive <br> Chantilly VA 20152 <br> (703) 926-5780</p>
                  </div>
              </div>
      
              <div class="table-responsive">
                  <table class="invoice-table table table-sm table-striped table-bordered table-hover">
                      <thead>
                          <tr>
                              <th>Option</th>
                              <th>Description</th>
                              <th>Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                        ${tableRows}
                      </tbody>
                      <tfoot>
                          <tr>
                              <td>Total</td>
                              <td></td>
                              <td>${totalFormatted}</td>
                          </tr>
                      </tfoot>
                  </table>
              </div>
      
              <div class="invoice-footer">Alliance Builders Inc.</div>
          </div>
      
      </body>
      
      </html>
    `

  if (fs.existsSync(htmlPath)) {
    fs.unlinkSync(htmlPath)
  }

  fs.writeFileSync(htmlPath, htmlTemplate)
}

const createPDF = async (invoice: Invoice) => {
  createHTMLFile(invoice)

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto(htmlPath)
  const pdf = await page.pdf({ preferCSSPageSize: true })
  await browser.close()

  return pdf
}

export default createPDF
