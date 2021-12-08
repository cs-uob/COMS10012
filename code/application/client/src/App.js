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
    this.details = this.details.bind(this);
  }

  details() {
    console.log("details for " + this.state.overview + " " + this.state.overviewCode);
    this.setState({
      detail: this.state.overview,
      detailName: this.state.overviewName,
      detailCode: this.state.overviewCode
    })
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
          overviewCode: code,
          detailCode: ""
        })
        break;
      case "region":
        if (isParent) {
          this.setState({
            overview: "country",
            overviewName: "Country",
            overviewChildren: "regions",
            overviewCode: code,
            detailCode: ""
          })
        } else {
          this.setState({
            overview: "county",
            overviewName: "County",
            overviewChildren: "wards",
            overviewCode: code,
            detailCode: ""
          })
        }
        break;
      case "county":
        if (isParent) {
          this.setState({
            overview: "region",
            overviewName: "Region",
            overviewChildren: "counties",
            overviewCode: code,
            detailCode: ""
          })
        } else {
          this.setState({
            overview: "ward",
            overviewName: "Ward",
            overviewChildren: undefined,
            overviewCode: code,
            detailCode: ""
          })
        }
        break;
      case "ward":
        // wards have no children
        this.setState({
          overview: "county",
          overviewName: "County",
          overviewChildren: "wards",
          overviewCode: code,
          detailCode: ""
        })
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
                        callback={this.navigate}
                        details={this.details}></OverView>
            </Col>
            <Col>
              {
                this.state.detailCode === "" ? "" :
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
    this.details = this.details.bind(this);
  }

  details() {
    this.props.details();
  }

  navigate(code, isParent) {
    this.props.callback(code, isParent);
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/" + this.props.type + "/" + this.props.code)
      .then(r => {
        if (!r.ok) {
          const e = "Attempting to load " + r.url + " got status " + r.status + ".";
          this.setState({loaded: "error", errmsg: e})
        }
        return r.json()
      })
      .then (
        (result) => {
          if (this.state.loaded !== "error") {
            this.setState({loaded: "yes", item: result})
          }
        },
        (error) => {
          this.setState({loaded: "error", errmsg: "Network error"})
        }
      )
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (this.props.code !== oldProps.code) {
      this.componentDidMount()
    }
  }

  hasChildren() {
    return this.state.item[this.props.children] !== undefined;
  }

  children() {
    const ch = this.state.item[this.props.children]
    if (ch === undefined) {
      return ""
    } else {
      return ch.map(i =>
        <li key={i.code}><Button className="pt-0 pb-0" variant="link" 
            onClick={() => this.navigate(i.code, false)}>{i.name}</Button></li>
        )
    }
  }

  parent() {
   const code = this.state.item.parentCode;
   if (code === undefined) {
     return ""
   } else {
     return (
      <Button variant="link" className="p-0"
              onClick={() => this.navigate(code, true)}>
              Back to parent</Button>
     )
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
              <Card.Text>
                {this.state.errmsg}
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
                {this.hasChildren() ? <b>Contains:</b> : ""} </Card.Text>
              <ul>
              { this.children() }
              </ul>
              { this.parent() }
              <Button variant="link" onClick={this.details}>
              Details</Button>
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
    fetch("http://localhost:8000/api/details/" + this.props.type + "/" + this.props.code)
      .then(r => {
        if (!r.ok) {
          const e = "Attempting to load " + r.url + " got status " + r.status + ".";
          this.setState({isLoaded: true, isError: true, errmsg: e})
        }
        return r.json()
      })
      .then (
        (result) => {
          if (!this.state.isError) {
            this.setState({isLoaded: true, item: result})
          }
        },
        (error) => {
          this.setState({isLoaded: true, isError: true, errmsg: "Network error"})
        }
      )
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    if (this.props.code !== oldProps.code) {
      this.componentDidMount()
    }
  }

  render() {
    if (this.state.isLoaded === false) {
      return (
        <Card>
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
        <Card>
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
      <Card>
        <Card.Body>
          <Card.Title>Statistics</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">for {this.props.displayName} {this.props.code}</Card.Subtitle>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Occupation class</th>
                <th style={{textAlign: "right"}}>Women</th>
                <th style={{textAlign: "right"}}>Men</th>
                <th style={{textAlign: "right"}}>Total</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.item.map(i =>
                <tr>
                  <td>{i.occName}</td>
                  <td style={{textAlign: "right"}}>{i.women}</td>
                  <td style={{textAlign: "right"}}>{i.men}</td>
                  <td style={{textAlign: "right"}}>{i.total}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </Card.Body>
      </Card>
    )
  }
}


export default App;
