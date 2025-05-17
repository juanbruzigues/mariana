import React from 'react';
import Gallery from './components/gallery.jsx';
import Menu from './components/menu.jsx';
import ParticleCanvas from './components/particlescanvas.jsx';
import CartaDeAmor from './components/cartadeamor.jsx';
import './App.scss'; 

function App() {
  return (
    <div className="App">
      <ParticleCanvas />
      <CartaDeAmor/>
      <Menu />
      <Gallery />
      
    </div>
  );
  
}

export default App;
