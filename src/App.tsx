import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Heatmap from './components/Heatmap';
import Home from './components/Home';
import StudentNetwork from './components/StudentNetwork';
import TablePage from './components/Table';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/table' element={<TablePage />} />
      <Route path='/heatmap' element={<Heatmap />} />
      <Route path='/table' element={<StudentNetwork />} />
    </Routes>
  );
}

export default App;
