import React, { Component } from "react";
import Routers from './Components/Config/Router.js'
import Store from './Store'
import {Provider} from 'react-redux'
class App extends Component {
  render() {
    return(
      <Provider store={Store}>
    <div>
      <Routers/>
    </div>
    </Provider>)
  }
}

export default App;
