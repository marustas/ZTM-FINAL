import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const returnClarifaiRequestOptions = (imageUrl) => {
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
        "inputs": [{
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }]
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
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                email:'',
                password:'',
                name: '',
                entries: 0,
                joined : ''
            }
        }
    }

    loadUser=(data)=>{
        this.setState({data: {
            id: data.id,
            email: data.email,
            password: data.password,
            name: data.name,
            entries: data.entries,
            joined : data.joined
            }
        })
    }
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            rightCol: width - (clarifaiFace.right_col * width),
            topRow: clarifaiFace.top_row * height,
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    onSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        console.log('click');
        // eslint-disable-next-line no-useless-concat
        fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", returnClarifaiRequestOptions(this.state.input))
            .then(response => response.json())
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
            .catch(err => console.log(err))
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
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
      const {isSignedIn, box, imageUrl, route} = this.state;
        return ( 
        <div className = "App" >
            <ParticlesBg type = "cobweb" bg = {true}/> 
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {route === 'home'? 
            <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onSubmit }/> 
              <FaceRecognition box = { box } imageUrl = { imageUrl }/>
            </div>
         : (route === 'signin'?
           <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 
         : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
         )
        }
        </div>
        );
    }
}

export default App;