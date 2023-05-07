import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey : '3bc66df5e5604cefb0e79231ac135cb0'
});
class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
}
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
