import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      overview: "country",
      overviewName: "Country",
      overviewCode: "E92000001",
      overviewChildren: "regions",
      detail: "",
      detailName: "",
      detailCode: ""
    }
    this.navigate = this.navigate.bind(this);
  }

  navigate(code, isParent) {
    // Called when we want to change the main view.
    switch (this.state.overview) {
      case "country":
        // no parent option here
        this.setState({
          overview: "region",
          overviewName: "Region",
          overviewChildren: "counties",
          overviewCode: code
        })
        break;
      case "region":
        if (isParent) {
          this.setState({
            overview: "country",
            overviewName: "Country",
            overviewChildren: "regions",
            overviewCode: code
          })
        } else {

        }
        break;
      default:
          console.log("App.navigate")
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
                        code = {this.state.overviewCode}
                        children = {this.state.overviewChildren}
                        callback={this.navigate}></OverView>
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
    this.navigate = this.navigate.bind(this);
  }

  navigate(code, isParent) {
    this.props.callback(code, isParent);
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

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (this.props.code !== oldProps.code) {
      this.componentDidMount()
    }
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
              <Card.Title>{this.state.item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{this.props.displayName}</Card.Subtitle>
              <Card.Text>
                <b>ID: </b>{this.state.item.code} <br />
                <b>Contains:</b> </Card.Text>
              <ul>
              {
                this.state.item[this.props.children] === undefined ?
                "" :
                this.state.item[this.props.children].map(i => 
                <li key={i.code}><Button className="pt-0 pb-0" variant="link" 
                  onClick={() => this.navigate(i.code, false)}>{i.name}</Button></li>
              )}
              </ul>
              {
                this.state.item.parentCode === undefined ? "" :
                <Button variant="link" className="p-0"
                  onClick={() => this.navigate(this.state.item.parentCode, true)}>
                  Back to parent</Button>  
              }
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
