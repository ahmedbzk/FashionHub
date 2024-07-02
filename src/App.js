import React from 'react';
import './App.scss';
import Header from './components/Header';
import Main from './components/Main';
import HeaderImage from './components/HeaderImage';


function App() {
  return (
    <div className="App">
      <Header />
      <HeaderImage />
      <Main />
    </div>
  );
}

export default App;
