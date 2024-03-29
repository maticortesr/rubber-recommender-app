import React, { useState } from "react";
import axios from "axios";
import rubber_dict from "./components/rubber_list";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const App = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleRubberSelection = (value) => {
    console.log(value["value"]);
    axios
      .post("https://rubber-recommender-api.herokuapp.com/predict", {
        rubber: value["value"],
      })
      .then((response) => {
        console.log("promise fulfilled");
        setData(JSON.parse(response.data).data);
        setColumns(JSON.parse(response.data).columns);
        setSelectedValue(value["value"]);
      });
  };

  const showSelection =
    selectedValue !== "" ? <h5>Rubbers similar to {selectedValue}</h5> : " ";

  return (
    <div>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col style={{ backgroundColor: "#e1e3e8" }}></Col>
          <Col style={{ boxShadow: "0px 0px 32px 2px #2e2a2e" }}>
            <Row
            >
              <Col>
                <img src="logo.png" alt="logo"  /> 
                <p> Looking for a new rubber for your raquet? Select one from the list and see how it compares to other popular options.</p>
                <p>Rubbers are sorted by how similar they are to your selection.</p>
              </Col>
            </Row>

            <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Col>
                {" "}
                <Select
                  value={null}
                  onChange={handleRubberSelection}
                  options={rubber_dict}
                  isSearchable="True"
                  placeholder="Select Rubber..."
                />{" "}
              </Col>
            </Row>

            <Row style={{ paddingTop: 20 }}>
              <Col>{showSelection}</Col>
            </Row>

            <DisplayPrediction data={data} columns={columns} />

            <Row
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                position: "absolute",
                bottom: 0,
              }}
            >
              <Col> Data Source: Revspin.net </Col>
            </Row>
          </Col>

          <Col style={{ backgroundColor: "#e1e3e8" }}></Col>
        </Row>
      </Container>
    </div>
  );
};

const DisplayPrediction = (props) => {
  console.log(props);
  const columns = props.columns;
  const data = props.data;

  return (
    <Row style={{ paddingTop: 30, paddingBottom: 70 }}>
      <Col style={{ whiteSpace: "normal" }}>
        <Table striped bordered size="sm" responsive>
          <thead>
            <tr>
              {columns.map((column) => {
                return <th>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row[0]}>
                  {row.map((d) => (
                    <td>{d}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default App;
