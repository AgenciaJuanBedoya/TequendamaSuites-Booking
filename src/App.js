import React from "react";
import {Col, Container, FormText, Input, Row} from "reactstrap";
import {addDays, format} from "date-fns"
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import BG from './bg.jpg';
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      adults: 1,
      kids: 0,
      check_in: addDays(new Date(), 1),
      check_out: addDays(new Date(), 2),
      promo_code: '',
    };
  }

  handleOnCheckIn(e) {
    this.setState({
      ...this.state,
      check_in: e,
    });
  }

  handleOnCheckOut(e) {
    this.setState({
      ...this.state,
      check_out: e,
    });
  }

  handleOnChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  handleOnAdd(e) {
    if (e === 'adults') {
      if (this.state.adults < 10) {
        this.setState({
          ...this.state,
          adults: this.state.adults + 1,
        });
      }
    } else {
      if (this.state.kids < 10) {
        this.setState({
          ...this.state,
          kids: this.state.kids + 1,
        });
      }
    }
  }

  handleOnSubtract(e) {
    if (e === 'adults') {
      if (this.state.adults > 1) {
        this.setState({
          ...this.state,
          adults: this.state.adults - 1,
        });
      }
    } else {
      if (this.state.kids > 0) {
        this.setState({
          ...this.state,
          kids: this.state.kids - 1,
        });
      }
    }
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${BG})`}} className="Root">
        <div className="Main">
          <Container fluid>
            <Row className="justify-content-center align-items-start">
              <Col className="Counters" sm={12} md={6} lg={4} xl={2}>
                <span onClick={() => this.handleOnAdd('adults')}>+</span>
                <div style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                  <Input
                    readOnly
                    type="number"
                    name="adults"
                    value={this.state.adults}
                    style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}
                  />
                  <FormText color="muted" className="TextMuted">
                    Adultos
                  </FormText>
                </div>
                <span onClick={() => this.handleOnSubtract('adults')}>-</span>
              </Col>
              <Col className="Counters" sm={12} md={6} lg={4} xl={2}>
                <span onClick={() => this.handleOnAdd('kids')}>+</span>
                <div style={{marginLeft: 10, marginRight: 10, width: '100%'}}>
                  <Input
                    readOnly
                    type="number"
                    name="kids"
                    value={this.state.kids}
                    style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}
                  />
                  <FormText color="muted" className="TextMuted">
                    Niños
                  </FormText>
                </div>
                <span onClick={() => this.handleOnSubtract('kids')}>-</span>
              </Col>
              <Col sm={12} md={6} lg={4} xl={2}>
                <DatePicker
                  style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}
                  onChange={e => this.handleOnCheckIn(e)}
                  minDate={addDays(new Date(), 1)}
                  value={this.state.check_in}
                />
                <FormText color="muted" className="TextMuted">
                  Fecha de Check In
                </FormText>
              </Col>
              <Col sm={12} md={6} lg={4} xl={2}>
                <DatePicker
                  style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}
                  onChange={e => this.handleOnCheckOut(e)}
                  minDate={addDays(this.state.check_in, 1)}
                  value={this.state.check_out}
                />
                <FormText color="muted" className="TextMuted">
                  Fecha de Check Out
                </FormText>
              </Col>
              <Col sm={12} md={6} lg={4} xl={2}>
                <Input
                  type="text"
                  name="promo_code"
                  value={this.state.promo_code}
                  onChange={this.handleOnChange}
                  style={{fontFamily: 'Montserrat', fontWeight: 'bold'}}
                />
                <FormText color="muted" className="TextMuted">
                  Código promocional
                </FormText>
              </Col>
              <Col sm={12} md={6} lg={4} xl={2}>
                <a
                  href={`https://be.synxis.com/?adult=${this.state.adults}&arrive=${format(this.state.check_in, 'yyyy-MM-dd')}&chain=25518&child=${this.state.kids}&currency=COP&depart=${format(this.state.check_out, 'yyyy-MM-dd')}&hotel=8717&level=hotel&locale=es-MX&rooms=1&promo=${this.state.promo_code}`}
                  className="btn btn-warning btn-block"
                  target="_blank"
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    marginTop: 5,
                    color: '#212121',
                  }}
                >
                  Buscar
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
