import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      overview: "country",
      overviewName: "Country",
      overviewCode: "E92000001",
      detail: "",
      detailName: "",
      detailCode: ""
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Census Explorer</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="mt-2">
          <Row>
            <Col>
              <OverView displayName = {this.state.overviewName}
                        type = {this.state.overview}
                        code = {this.state.overviewCode}></OverView>
            </Col>
            <Col>
              {
                this.state.detail === "" ? "" :
                <UnitView displayName={this.state.detailName} 
                          type={this.state.detail} 
                          code={this.state.detailCode}></UnitView>
              }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: "no", // options: no, yes, error
      item: null
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/" + this.props.type + "/" + this.props.code)
      .then(r => r.json())
      .then (
        (result) => {
          this.setState({loaded: "yes", item: result})
        },
        (error) => {
          this.setState({loaded: "error"})
        }
      )
  }

  render() {
    switch (this.state.loaded) {
      case "no":
        return (
          <Card>
            <Card.Body>
              <Card.Text>
                Loading ...
              </Card.Text>
            </Card.Body>
          </Card>
        )
      case "error":
        return (
          <Card>
            <Card.Body>
              <Card.Text>
                An error occurred.
              </Card.Text>
            </Card.Body>
          </Card>
        )
      default: // yes
        return (
          <Card>
            <Card.Body>
              <Card.Text>
                Success.
              </Card.Text>
            </Card.Body>
          </Card>
        )
    }
  }
}

class UnitView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
      item: {}
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/" + this.props.type + "/" + this.props.code)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({isLoaded: true, item: result})
        },
        (error) => {
          this.setState({isLoaded: true, isError: true})
        }
      )
  }

  render() {
    if (this.state.isLoaded === false) {
      return (
        <Card style={{width: '20rem'}}>
          <Card.Body>
            <Card.Text>
              Loading ...
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
    if (this.state.isError) {
      return (
        <Card style={{width: '20rem'}}>
          <Card.Body>
            <Card.Title>Error</Card.Title>
            <Card.Text>
              An error occurred.
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
    return (
      <Card style={{width: '20rem'}}>
        <Card.Body>
          <Card.Title>{this.state.item.name}</Card.Title>
          <Card.Text>
            {this.props.displayName} {this.props.code}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}


export default App;
