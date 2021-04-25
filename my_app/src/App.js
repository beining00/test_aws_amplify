import logo from './logo.svg';
import './App.css';
import React from 'react.js'

const axios = require('axios');

function App() {
  React.useEffect(() => {
    axios.get('/user?ID=12345')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  },[])
    
  
  
  return (
    <div className="App">
      <h1>Test Front End </h1>


    </div>
  );
}

export default App;
