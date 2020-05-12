import React, { Component } from 'react';
import './App.css';
import { FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state = {
    cars: [],
    newCarData: {
       id: '',
       mark: '',
       model: '',
       year: '',
       color: ''
    },
    modCarData: {
      id: '',
      mark: '',
      model: '',
      year: '',
      color: ''
   },
    newCarModal: false,
    modCarModal: false
  }

  componentDidMount(){
    this._refreshCars();
  }

  toggleNewCarModal(){
    this.setState({
      newCarModal: !this.state.newCarModal
    });
  }

  toggleModCarModal(){
    this.setState({
      modCarModal: !this.state.modCarModal
    });
  }

  addCar(){
    axios.post('http://localhost:7111/cars', this.state.newCarData).then((response) => {
      // console.log(response.data);
      let { cars } = this.state;

      cars.push(response.data);
      this._refreshCars();
      
      this.setState({ cars, newCarModal: false, newCarData: {
        id: '',
        mark: '',
        model: '',
        year: '',
        color: ''
      }});
    });
  }

  updateCar(){
      let { mark, model, year, color } = this.state;

      axios.put('http://localhost:7111/cars', this.state.modCarData, {
        mark, model, year, color
      }).then((response) => {
        this._refreshCars();

        this.setState({
          modCarModal: false,
          modCarData: {
            id: '',
            mark: '',
            model: '',
            year: '',
            color: ''
          }
        })
        // console.log(response.data);
      });
  }

  modCar(id, mark, model, year, color){
    this.setState({
      modCarData: { id, mark, model, year, color }, modCarModal: !this.state.modCarModal
    });
  }

  deleteCar(id){
    axios.delete('http://localhost:7111/cars/' + id).then((response) => {
      this._refreshCars();
    })
  }

  _refreshCars(){
    axios.get('http://localhost:7111/cars').then((response) => {
      this.setState({
        cars: response.data
      })
    });
  }

  render(){
    let cars = this.state.cars.map((car) => {
      return (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.mark}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.color}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.modCar.bind(this, car.id, car.mark, car.model, car.year, car.color)}>Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteCar.bind(this, car.id)}>Delete</Button>
            </td>
          </tr>
      )
    });

  return (
    <div className="App container">

      <h1>Cars Application</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewCarModal.bind(this)}>Add Car</Button>
      <Modal isOpen={this.state.newCarModal} toggle={this.toggleNewCarModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewCarModal.bind(this)}>Add a new car</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="id" hidden>Id</Label>
            <Input type="text" name="id" id="id" value={this.state.newCarData.id} onChange={(e) => {
              let { newCarData } = this.state;
              newCarData.id = e.target.value;
              this.setState({
                newCarData
              });
            }} placeholder="Id" hidden />
          </FormGroup>
          <FormGroup>
            <Label for="mark">Marka</Label>
            <Input type="text" name="mark" id="mark" value={this.state.newCarData.mark} onChange={(e) => {
              let { newCarData } = this.state;
              newCarData.mark = e.target.value;
              this.setState({
                newCarData
              });
            }} placeholder="Marka" />
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" value={this.state.newCarData.model} onChange={(e) => {
              let { newCarData } = this.state;
              newCarData.model = e.target.value;
              this.setState({
                newCarData
              });
            }} placeholder="Model" />
          </FormGroup>
          <FormGroup>
            <Label for="year">Rok produkcji</Label>
            <Input type="text" name="year" id="year" value={this.state.newCarData.year} onChange={(e) => {
              let { newCarData } = this.state;
              newCarData.year = e.target.value;
              this.setState({
                newCarData
              });
            }} placeholder="Rok produkcji" />
          </FormGroup>
          <FormGroup>
            <Label for="color">Kolor</Label>
            <Input type="text" name="color" id="color" value={this.state.newCarData.color} onChange={(e) => {
              let { newCarData } = this.state;
              newCarData.color = e.target.value;
              this.setState({
                newCarData
              });
            }} placeholder="Kolor" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addCar.bind(this)}>Add Car</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewCarModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={this.state.modCarModal} toggle={this.toggleModCarModal.bind(this)}>
        <ModalHeader toggle={this.toggleModCarModal.bind(this)}>Edit a new car</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="id" hidden>Id</Label>
            <Input type="text" name="id" id="id" value={this.state.modCarData.id} onChange={(e) => {
              let { modCarData } = this.state;
              modCarData.id = e.target.value;
              this.setState({
                modCarData
              });
            }} placeholder="Id" hidden />
          </FormGroup>
          <FormGroup>
            <Label for="mark">Marka</Label>
            <Input type="text" name="mark" id="mark" value={this.state.modCarData.mark} onChange={(e) => {
              let { modCarData } = this.state;
              modCarData.mark = e.target.value;
              this.setState({
                modCarData
              });
            }} placeholder="Marka" />
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" value={this.state.modCarData.model} onChange={(e) => {
              let { modCarData } = this.state;
              modCarData.model = e.target.value;
              this.setState({
                modCarData
              });
            }} placeholder="Model" />
          </FormGroup>
          <FormGroup>
            <Label for="year">Rok produkcji</Label>
            <Input type="text" name="year" id="year" value={this.state.modCarData.year} onChange={(e) => {
              let { modCarData } = this.state;
              modCarData.year = e.target.value;
              this.setState({
                modCarData
              });
            }} placeholder="Rok produkcji" />
          </FormGroup>
          <FormGroup>
            <Label for="color">Kolor</Label>
            <Input type="text" name="color" id="color" value={this.state.modCarData.color} onChange={(e) => {
              let { modCarData } = this.state;
              modCarData.color = e.target.value;
              this.setState({
                modCarData
              });
            }} placeholder="Kolor" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCar.bind(this)}>Update Car</Button>{' '}
          <Button color="secondary" onClick={this.toggleModCarModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Marka</th>
            <th>Model</th>
            <th>Rok produkcji</th>
            <th>Kolor</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {cars}
        </tbody>
      </Table>
    </div>
  )};
}

export default App;