import React from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import HeaderImage from './components/HeaderImage';


function App() {
  return (
    <div className="App">
      <Header />
      <HeaderImage />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
