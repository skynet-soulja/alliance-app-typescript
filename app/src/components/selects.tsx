import React from 'react'

import { jobsites, jobsiteMap, modelMap, elevationMap, ccMap, optionMap, Action, Invoice } from '../config'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const Selects: React.FC<{ dispatch: React.Dispatch<Action>; invoice: Invoice }> = ({ dispatch, invoice }) => {
  const selectedJobsite = jobsites.find((jobsite) => jobsite.name === invoice.jobsiteName) || jobsites[0]

  return (
    <>
      <Form.Row>
        <Form.Group xs="12" md="6" lg="6" as={Col}>
          <Form.Label>Job Site</Form.Label>

          <Form.Control
            name="jobsite"
            as="select"
            onChange={(event) => dispatch({ type: 'SET-JOBSITE-NAME', value: jobsiteMap[event.target.value] })}
          >
            {jobsites.map((jobsite) => {
              return (
                <option key={`jobsite__${jobsite.id}`} value={jobsite.id}>
                  {jobsite.name}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group xs="12" md="6" lg="4" as={Col}>
          <Form.Label>Model</Form.Label>

          <Form.Control
            name="model"
            as="select"
            onChange={(event) => dispatch({ type: 'SET-MODEL-NAME', value: modelMap[event.target.value] })}
          >
            {selectedJobsite.model.map((id) => (
              <option key={`model__${id}`} value={id}>
                {modelMap[id]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group xs="12" md="6" as={Col}>
          <Form.Label>Elevation</Form.Label>

          <Form.Control
            name="elevation"
            as="select"
            onChange={(event) => dispatch({ type: 'SET-ELEVATION-NAME', value: elevationMap[event.target.value] })}
          >
            {selectedJobsite.elevation.map((id) => (
              <option key={`elevation__${id}`} value={id}>
                {elevationMap[id]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group xs="12" md="6" lg="4" as={Col}>
          <Form.Label>CC Description</Form.Label>

          <Form.Control name="cc" as="select">
            {selectedJobsite.cc.map((id) => (
              <option key={`cc__${id}`} value={id}>
                {ccMap[id]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group xs="12" md="6" as={Col}>
          <Form.Label>Option</Form.Label>

          <Form.Control name="option" as="select">
            {selectedJobsite.option.map((id) => (
              <option key={`option__${id}`} value={id}>
                {optionMap[id]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </>
  )
}

export default Selects

// import React from 'react'
// import data from '../data.json'

// import Form from 'react-bootstrap/Form'
// import Col from 'react-bootstrap/Col'

// const DependantInputs: React.FC<{ jobsite: IJobsite }> = ({ jobsite }) => {
//   const modelMap: IMap = data.modelMap
//   const elevationMap: IMap = data.elevationMap
//   const ccMap: IMap = data.ccMap
//   const optionMap: IMap = data.optionMap

//   return (
//     <>
//       <Form.Row>
//         <Form.Group xs="12" md="3" as={Col}>
//           <Form.Label>Model</Form.Label>

//           <Form.Control name="model" as="select">
//             {jobsite.model.map((n: number) => (
//               <option key={`model__${n}`} value={n}>
//                 {modelMap[n]}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group xs="12" md="3" as={Col}>
//           <Form.Label>Elevation</Form.Label>

//           <Form.Control name="elevation" as="select">
//             {jobsite.elevation.map((n: number) => (
//               <option key={`elevation__${n}`} value={n}>
//                 {elevationMap[n]}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//       </Form.Row>

//       <Form.Row>
//         <Form.Group xs="12" md="3" as={Col}>
//           <Form.Label>CC Description</Form.Label>

//           <Form.Control name="cc" as="select">
//             {jobsite.cc.map((n: number) => (
//               <option key={`cc__${n}`} value={n}>
//                 {ccMap[n]}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group xs="12" md="3" as={Col}>
//           <Form.Label>Option</Form.Label>

//           <Form.Control name="option" as="select">
//             {jobsite.option.map((n: number) => (
//               <option key={`option__${n}`} value={n}>
//                 {optionMap[n]}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//       </Form.Row>
//     </>
//   )
// }

// export default DependantInputs
