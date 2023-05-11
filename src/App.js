import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const returnClarifaiRequestOptions =(imageUrl) =>{
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '52b1b44f603643f898fa75627bd79517';
// Specify the correct user_id/app_id pairings
const USER_ID = 'stasstone2004';       
const APP_ID = 'brain';
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
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation=(data)=>{
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
return{
  leftCol: clarifaiFace.left_col * width,
  rightCol: width - (clarifaiFace.right_col * width),
  topRow: clarifaiFace.top_row * height,
  bottomRow: height - (clarifaiFace.bottom_row * height)
}
}

  onSubmit =() =>{
    this.setState({imageUrl: this.state.input})
    console.log('click');
    // eslint-disable-next-line no-useless-concat
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(err => console.log(err))
  }

  displayFaceBox =(box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
   this.setState({input: event.target.value})
}

  render() {
    return (
      <div className="App">
  <ParticlesBg type="cobweb" bg={true}/>
  <Navigation/>
  <Logo />
  <Rank />
  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />
  <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
