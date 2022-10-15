import { Route, Routes } from 'react-router-dom';
import Heatmap from './components/Heatmap';
import Home from './components/Home';
import StudentNetwork from './components/StudentNetwork';
import TablePage from './components/Table';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/table' element={<TablePage />} />
      <Route path='/heatmap' element={<Heatmap location={location} zoomLevel={17}/>} />
      <Route path='/table' element={<StudentNetwork />} />
    </Routes>
  );
}

export default App;
