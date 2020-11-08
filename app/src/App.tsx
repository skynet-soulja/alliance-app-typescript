import React from 'react'
import './styles/App.css'

import {
  jobsites,
  priceMap,
  optionMap,
  modelMap,
  elevationMap,
  Invoice,
  Action,
  numberWithCommas,
  calculateTotal,
} from './config'

import Inputs from './components/inputs'
import Selects from './components/selects'
import TableComponent from './components/table'
import ModalComponent from './components/modal'
import LoaderComponent from './components/loader'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const initialState: Invoice = {
  jobsiteName: jobsites[0].name,
  modelName: modelMap[jobsites[0].model[0]],
  elevationName: elevationMap[jobsites[0].elevation[0]],
  sendTo: localStorage.getItem('sendTo') || '',
  today: new Date().toLocaleDateString(),
  invoiceNumber: '',
  lotNumber: '',
  total: '',
  totalFormatted: '',
  invoiceItems: [],
}

const reducer = (invoice: Invoice, action: Action) => {
  switch (action.type) {
    case 'SET-SENDTO':
      return { ...invoice, sendTo: action.value }
    case 'SET-INVOICE#':
      return { ...invoice, invoiceNumber: action.value }
    case 'SET-LOT#':
      return { ...invoice, lotNumber: action.value }
    case 'SET-JOBSITE-NAME':
      return { ...invoice, jobsiteName: action.value }
    case 'SET-MODEL-NAME':
      console.log(action.value)
      return { ...invoice, modelName: action.value }
    case 'SET-ELEVATION-NAME':
      return { ...invoice, elevationName: action.value }
    case 'ADD-INVOICE-ITEM':
      const jobsiteId = (document.querySelector('select[name=jobsite]') as HTMLInputElement).value
      const ccId = (document.querySelector('select[name=cc]') as HTMLInputElement).value
      const modelId = (document.querySelector('select[name=model]') as HTMLInputElement).value
      const elevationId = (document.querySelector('select[name=elevation]') as HTMLInputElement).value
      const optionId = (document.querySelector('select[name=option]') as HTMLInputElement).value

      const priceIdCollection = [jobsiteId, ccId, modelId, elevationId, optionId]

      const price = (() => {
        for (const key in priceMap) {
          if (key.split('|').every((k, i) => k === priceIdCollection[i] || k === '*')) {
            return priceMap[key]
          }
        }
      })()

      if (!price) {
        alert(`Invalid Invoice Item!`)
        return invoice
      }

      const newInvoiceItems = [
        ...invoice.invoiceItems,
        {
          option: optionId === '0' ? ccId : optionId,
          description: optionMap[optionId],
          price: price,
          priceFormatted: isNaN(parseInt(price)) ? price : `$${numberWithCommas(parseInt(price))}`,
        },
      ]

      return {
        ...invoice,
        ...calculateTotal(newInvoiceItems),
      }

    case 'REMOVE-INVOICE-ITEM':
      return {
        ...invoice,
        ...calculateTotal([...invoice.invoiceItems.filter((_, i) => i !== action.index)]),
      }
    case 'RESET-INVOICE-ITEMS':
      return { ...invoice, ...calculateTotal([]) }
    default:
      return invoice
  }
}

function App() {
  const [invoice, dispatch] = React.useReducer(reducer, initialState)

  //   Display settings
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const showPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!invoice.invoiceItems.length) {
      return alert('No Invoice Items Added')
    }

    setShowModal(true)
  }

  const sendEmail = async () => {
    localStorage.setItem('sendTo', invoice.sendTo)

    try {
      setLoading(true)

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice),
      })

      setLoading(false)

      if (!response.ok) {
        throw new Error()
      }

      alert('Email Sent Successfully!')
      setShowModal(false)
    } catch (error) {
      setLoading(false)

      alert('ERROR SENDING EMAIL! EMAIL DID NOT SEND SUCCESSFULLY')
    }
  }

  return (
    <div className="App container">
      <header>
        <h1 className="page-title">Alliance Builders</h1>
      </header>

      <main>
        <ModalComponent showModal={showModal} setShowModal={setShowModal} invoice={invoice} sendEmail={sendEmail} />

        {loading && <LoaderComponent />}

        <Form onSubmit={showPreview}>
          <Inputs dispatch={dispatch} invoice={invoice} />

          <Selects dispatch={dispatch} invoice={invoice} />

          <Form.Row>
            <Col id="btn-ctrl">
              <Button variant="primary" type="button" onClick={() => dispatch({ type: 'ADD-INVOICE-ITEM' })}>
                Add Invoice Item
              </Button>
              <Button variant="primary" type="button" onClick={() => dispatch({ type: 'RESET-INVOICE-ITEMS' })}>
                Clear Invoice
              </Button>
              <Button variant="primary" type="submit">
                Preview
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <TableComponent dispatch={dispatch} invoice={invoice} />
      </main>
    </div>
  )
}

export default App
