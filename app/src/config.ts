import data from './data.json'

export type Invoice = {
  jobsiteName: string
  modelName: string
  elevationName: string
  sendTo: string
  today: string
  invoiceNumber: string
  lotNumber: string
  total: string
  totalFormatted: string
  invoiceItems: InvoiceItem[]
}

export type InvoiceItem = {
  option: string
  description: string
  price: string
  priceFormatted: string
}

export type Action =
  | { type: 'SET-SENDTO'; value: string }
  | { type: 'SET-INVOICE#'; value: string }
  | { type: 'SET-LOT#'; value: string }
  | { type: 'SET-JOBSITE-NAME'; value: string }
  | { type: 'SET-MODEL-NAME'; value: string }
  | { type: 'SET-ELEVATION-NAME'; value: string }
  | { type: 'ADD-INVOICE-ITEM' }
  | { type: 'REMOVE-INVOICE-ITEM'; index: number }
  | { type: 'RESET-INVOICE-ITEMS' }

export type Jobsite = {
  id: number
  name: string
  cc: number[]
  model: number[]
  elevation: number[]
  option: number[]
}

export type Map = {
  [key: string]: string
}

export const jobsiteMap: Map = data.jobsiteMap
export const ccMap: Map = data.ccMap
export const modelMap: Map = data.modelMap
export const elevationMap: Map = data.elevationMap
export const optionMap: Map = data.optionMap
export const priceMap: Map = data.priceMap

export const jobsites: Jobsite[] = data.jobsites.map((jobsite) => {
  return {
    ...jobsite,
    name: jobsiteMap[jobsite.id],
  }
})

export const validateData: () => void = () => {
  jobsites.forEach((jobsite: Jobsite) => {
    if (!jobsiteMap[jobsite.id]) {
      throw new Error(`Invalid Id (Jobsite) - ${jobsite.id}`)
    }

    jobsite.model.forEach((id) => {
      if (!modelMap[id]) {
        throw new Error(`Invalid Id (Model) - ${id}`)
      }
    })

    jobsite.elevation.forEach((id) => {
      if (!elevationMap[id]) {
        throw new Error(`Invalid Id (Elevation) - ${id}`)
      }
    })

    jobsite.cc.forEach((id) => {
      if (!ccMap[id]) {
        throw new Error(`Invalid Id (CC) - ${id}`)
      }
    })

    jobsite.option.forEach((id) => {
      if (!optionMap[id]) {
        throw new Error(`Invalid Id (Option) - ${id}`)
      }
    })
  })

  Object.keys(priceMap).forEach((key) => {
    const pipeCount = key.split('|').length - 1

    if (pipeCount !== 4) {
      throw new Error(`Invalid Price Key (Incorrect Pipe Count) - ${key}`)
    }

    key.split('|').forEach((k, i) => {
      if (i === 0 && !Object.keys(jobsiteMap).includes(k)) {
        throw new Error(`Invalid Price Key (Jobsite) - ${key}`)
      }

      if (k !== '*') {
        if (i === 1 && !Object.keys(ccMap).includes(k)) {
          throw new Error(`Invalid Price Key (CC) - ${key}`)
        }

        if (i === 2 && !Object.keys(modelMap).includes(k)) {
          throw new Error(`Invalid Price Key (Model) - ${key}`)
        }

        if (i === 3 && !Object.keys(elevationMap).includes(k)) {
          throw new Error(`Invalid Price Key (Elevation) - ${key}`)
        }
      }

      if (i === 4 && !Object.keys(optionMap).includes(k)) {
        throw new Error(`Invalid Price Key (Option) - ${key}`)
      }
    })
  })
}

export const numberWithCommas: (int: number) => string = (int) => {
  return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const calculateTotal: (
  invoiceItems: InvoiceItem[]
) => { invoiceItems: InvoiceItem[]; total: string; totalFormatted: string } = (invoiceItems) => {
  let newTotal = 0

  invoiceItems.forEach((item) => {
    const parsedPrice = parseInt(item.price)

    if (!isNaN(parsedPrice)) {
      newTotal += parsedPrice
    }
  })

  return { invoiceItems, total: `${newTotal}`, totalFormatted: `$${numberWithCommas(newTotal)}` }
}
