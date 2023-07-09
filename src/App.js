import './App.css';
import React, { Component } from 'react';
import Navigation from './Component/Navigation/Navigation';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Signin from './Component/Signin/Signin';
import Register from './Component/Register/Register';


const initialState = {
  input: '',
  imageUrl: '',
  // box: {},
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("https://mybackend-3m9h.onrender.com/imageurl", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.input
      })
    })
      .then(result => result.json())
      .then(result => {
        if (result) {
          fetch('https://mybackend-3m9h.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(result => result.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {

    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App" >
        <ParticlesBg type="cobweb" num={80} bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}></Navigation>
        {route === 'home'
          ? <div>
            <Logo></Logo>
            <Rank name={this.state.user.name} entries={this.state.user.entries}></Rank>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}></ImageLinkForm>
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}></FaceRecognition>
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}></Signin>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}></Register>

          )}


      </div>
    );
  }
}


export default App;
