import React from 'react';
//import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./components/mainPage";
import Trash from "./components/trash";

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<MainPage/>}/>
      <Route path="/trash" element = {<Trash/>}/>
    </Routes>
  )
}

export default App;
