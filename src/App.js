import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const returnClarifaiRequestOptions =(imageUrl) =>{
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '52b1b44f603643f898fa75627bd79517';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
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
    }
  }

  onSubmit =() =>{
console.log('click');
fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions())
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  }

  onInputChange = (event) => {
    console.log(event.target.value);
}
/*
onSubmit = () =>{
  console.log('click');
  app.models.predict("6dc7e46bc9124c5c8824be4822abe105", "https://samples.clarifai.com/metro-north.jpg").then(
    function(response){
console.log(response);
    },
    function(err){
    }
  );
}
*/

  render() {
    return (
      <div className="App">
 <ParticlesBg type="cobweb" bg={true}/>
  <Navigation/>
  <Logo />
  <Rank />
  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit} />

  {
  /*
    <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
