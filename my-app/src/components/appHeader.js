import React, { Component } from 'react';
import '../App.css'

const AppHeader = () => {

  return (
    <div className="App-header">
      <div className='logoWrapper'>
        <img className='logo' src={require('./images/hungryLogo.png')}></img>
      </div>
    </div>
  )
}

export default AppHeader
