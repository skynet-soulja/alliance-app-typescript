import React from 'react'

import { Action, Invoice } from '../config'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const TableComponent: React.FC<{ dispatch: React.Dispatch<Action>; invoice: Invoice }> = ({ dispatch, invoice }) => {
  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>Option</th>
          <th className="responsive-hide">Description</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
      </thead>

      <tbody>
        {invoice.invoiceItems.length ? (
          invoice.invoiceItems.map((item, i) => (
            <tr key={`tr__${i}`}>
              <td>{item.option}</td>
              <td className="responsive-hide">{item.description}</td>
              <td>{item.priceFormatted}</td>
              <td>
                <Button
                  className="remove-button"
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch({ type: 'REMOVE-INVOICE-ITEM', index: i })}
                >
                  x
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>XXX</td>
            <td className="responsive-hide">XXX</td>
            <td>XXX</td>
            <td>XXX</td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td>Total</td>
          <td className="responsive-hide"></td>
          <td>{invoice.totalFormatted}</td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default TableComponent
