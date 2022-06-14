import React from 'react'
import '../styles/invoice.css'

import { Invoice } from '../config'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const ModalComponent: React.FC<{
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  invoice: Invoice
  sendEmail: () => void
}> = ({ showModal, setShowModal, invoice, sendEmail }) => {
  return (
    <Modal size="lg" show={showModal} onHide={setShowModal} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="invoice" id="invoice">
          <h1 className="invoice-title">Invoice</h1>

          <div className="invoice-tophead">
            <div>
              <h6>Invoice Number</h6>
              <span>{invoice.invoiceNumber}</span>
            </div>

            <div>
              <h6>Date of Issue</h6>
              <span>{invoice.today}</span>
            </div>
          </div>

          <div className="invoice-info">
            <div className="invoice-info-split">
              <h6>Billed To</h6>
              <p>Toll Integrated Systems</p>

              <h6>For</h6>
              <p>
                {invoice.jobsiteName} Lot # {invoice.lotNumber}
              </p>

              <h6>Model/Elevation</h6>
              <p>
                {invoice.modelName}/{invoice.elevationName}
              </p>
            </div>

            <div className="invoice-info-split">
              <h6>
                <b style={{ color: '#212529' }}>Alliance Builders Inc.</b>
              </h6>

              <p>
                24931 Avonlea Drive <br /> Chantilly VA 20152 <br /> (703) 926-5780
              </p>
            </div>
          </div>

          <Table className="invoice-table" bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Option</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoice.invoiceItems.map((item, i) => (
                <tr key={`emailtr__${i}`}>
                  <td>{item.option}</td>
                  <td>{item.description}</td>
                  <td>{item.priceFormatted}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>{invoice.totalFormatted}</td>
              </tr>
            </tfoot>
          </Table>

          <div className="invoice-footer">Alliance Builders Inc.</div>
          <em>Robert Martin</em>
          <span style={{ display: 'block' }}>electronic signature</span>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false)
          }}
        >
          Close
        </Button>

        <Button variant="primary" onClick={sendEmail}>
          Creat PDF
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent
