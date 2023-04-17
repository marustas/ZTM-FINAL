import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '3bc66df5e5604cefb0e79231ac135cb0',
    }
  }
  onInputChange = (event) => {
    console.log(event.target.value);
}

  onSubmit =() =>{
console.log('click');
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
