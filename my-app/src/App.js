import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginContainer from './components/loginContainer.js'
import FoodSelection from './components/foodSelection.js';
import AdminContainer from './components/adminContainer.js'
import { BrowserRouter, Switch, Route, withRouter, Redirect} from 'react-router-dom';


const App = () => (
  <div>
    <MyRoutes />
  </div>
)

export default App;

const MyRoutes = () => (

  <main>
    <Switch>
      <Route  exact path='/' component={FoodSelection}/>
      <Route  path='/admin' component={AdminContainer}/>
    </Switch>
  </main>

)
