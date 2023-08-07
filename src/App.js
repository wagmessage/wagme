
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {

  return (
    
    <div className="App">

      <Navigation />
      <Home />
      <About />

    </div>
  );
}

export default App;
