// import React from 'react';
import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';




const particlesOptions = {
  particles: {
                  number: {
                    value: 100, //previous:value:30
                    density: {
                      enable:true,
                      value_area:800
                    }
                  }
                }
}

 

// function App() {

// constructor(){

//     super();
//     this.state = {
//       input: '',
//     }
//   }

//   onInputChange = (event) =>{
//     console.log(event);
//   }
 
  
//   return (
//     <div className="App">
//       <Particles  className = 'particles'
//               params={particlesOptions}
             
//             />
//       <Navigation />
      
//       <Logo />
//       <Rank />
//       <ImageLinkForm onInputChange={this.onInputChange} />
//       {/*
      
//       <FaceRecognition />
//       */}
//     </div>
//   );
// }

// export default App;

const initialState = {
  input: '',
      imageUrl:'',
      box: {},
      route: 'signin',
      // route keeps track where we are on the page
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {

  constructor(){

    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // componentDidMount(){  
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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
    //console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    // console.log(event.target.value);
      this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=>{
    // console.log("click");
    this.setState({imageUrl: this.state.input});
      fetch('https://floating-coast-94293.herokuapp.com/imageurl', {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
         input: this.state.input
      })
    })
      .then(response => response.json())
    .then(response => {
      if(response){
       fetch('https://floating-coast-94293.herokuapp.com/image', {
        method:'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
         id: this.state.user.id
      })
    })
       .then(response => response.json())
       .then(count => {
        this.setState(Object.assign(this.state.user, {entries:count}))
       })
       .catch(err => console.log(err))
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home') {
      this.setState({isSignedIn: true })
    }
    this.setState({route:route}); 
  }
  
  render(){

    //destructing
    const   {isSignedIn , imageUrl , route , box} = this.state;
    return(
        <div className="App"> 
       <Particles  className = 'particles'
              params={particlesOptions}
             
            />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home' 

      ?<div>
        <Logo /> 
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        
        
        <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>

      :(

        route === 'signin'
        ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />


        )

      
      }
    </div>
      );
  }
}

export default App;