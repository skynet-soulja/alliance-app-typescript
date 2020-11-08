import React from 'react'

import { Action, Invoice } from '../config'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const Inputs: React.FC<{ dispatch: React.Dispatch<Action>; invoice: Invoice }> = ({ dispatch, invoice }) => {
  return (
    <>
      <Form.Row>
        <Form.Group xs="12" md="4" as={Col}>
          <Form.Label>Send To</Form.Label>

          <Form.Control
            name="sendTo"
            type="email"
            placeholder="Enter valid email"
            required
            value={invoice.sendTo}
            onChange={(event) => dispatch({ type: 'SET-SENDTO', value: event.target.value })}
          />
        </Form.Group>

        <Form.Group xs="12" md="4" as={Col}>
          <Form.Label>Invoice #</Form.Label>

          <Form.Control
            name="invoiceNumber"
            type="text"
            placeholder="Enter invoice #"
            required
            value={invoice.invoiceNumber}
            onChange={(event) => dispatch({ type: 'SET-INVOICE#', value: event.target.value })}
          />
        </Form.Group>

        <Form.Group xs="12" md="4" as={Col}>
          <Form.Label>Lot #</Form.Label>

          <Form.Control
            name="lotNumber"
            type="text"
            placeholder="Enter lot #"
            required
            value={invoice.lotNumber}
            onChange={(event) => dispatch({ type: 'SET-LOT#', value: event.target.value })}
          />
        </Form.Group>
      </Form.Row>
    </>
  )
}

export default Inputs
