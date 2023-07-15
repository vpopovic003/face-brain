import { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const returnClarifaiRequestOpstions = (imageUrl) => {
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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log(this.state.imageUrl);
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOpstions(this.state.imageUrl))
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  }

  render() {
    return (
      <div className="App">
        <>
          <div>
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl}/>
          </div>
          <ParticlesBg type="circle" bg={true} />
        </>

      </div>
    );
  }
}

export default App;
