import React, { useState } from 'react'
import axios from "axios"
import rubber_dict from './components/rubber_list'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Select from 'react-select';

const App = () => {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedValue, setSelectedValue] = useState("")


  const handleRubberSelection = (value) => {
    console.log(value['value'])
    axios
      .post('https://rubber-recommender-api.herokuapp.com/predict', { rubber: value['value'] })
      .then(response => {
        console.log('promise fulfilled')
        setData(JSON.parse(response.data).data)
        setColumns(JSON.parse(response.data).columns)
        setSelectedValue(value['value'])
      }
      )
      
  }

  const showSelection = selectedValue!=="" ? <h5>Rubbers similar to {selectedValue}</h5> : " "

  return (
    <div >      
      <Container fluid  >
        <Row style={{height: "100vh"}}>

          <Col style={{ backgroundColor: '#085aa1' }}></Col>
          <Col style={{ boxShadow: "0px 0px 32px 2px #2e2a2e" }} >

            <Row style={{ paddingTop: 40, paddingBottom: 40, textAlign: "center" , fontFamily: 'Bungee Shade' }}>
              <Col ><h1> Table Tennis Rubber Recommender</h1></Col>
            </Row>

            <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Col> <Select value={null} onChange={handleRubberSelection} options={rubber_dict} isSearchable="True" placeholder="Select Rubber..." /> </Col>
            </Row>

            <Row style={{ paddingTop: 20 }}>
              <Col>{showSelection}</Col>
            </Row>

            <DisplayPrediction data={data} columns={columns} />

          </Col>

          <Col style={{ backgroundColor: '#085aa1' }} ></Col>

        </Row>
      </Container>

      <Navbar fixed="bottom" expand="sm" variant="light" bg="light"  >
        <Container fluid>
          <Navbar.Brand >Data Source: Revspin.net</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

const DisplayPrediction = (props) => {
  console.log(props)
  const columns = props.columns
  const data = props.data


  return (
 

    <Row style={{ paddingTop: 30, paddingBottom: 70 }}>
      <Col style={{ whiteSpace: 'normal' }} >
        <Table striped bordered size="sm" responsive >
          <thead>
            <tr>
              {columns.map(column => {
                return <th>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(row => {
              return <tr key={row[0]}>
                {row.map(d => <td>{d}</td>)}
              </tr>;
            })}
          </tbody>
        </Table>

      </Col>
    </Row>

    )
}

export default App