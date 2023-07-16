import { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '4d97e8f614b54a2fb9962be2dc349a15';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'keen';       
  const APP_ID = 'face-brain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;  
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
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
  }

  // Connecting to back end (node/express)
 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (result) => {
    const clarifaiFace = result.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
    
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>           
        { this.state.route === 'home'
          ? 
          <>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}  
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}
            />
            <FaceRecognition 
              box={this.state.box} 
              imageUrl={this.state.imageUrl}
            />
          </>
          : ( this.state.route === 'signin'
              ? <Signin 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}/>
              : <Register 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange}/>
            )
          }
      </div>
    );
  }
}

export default App;
