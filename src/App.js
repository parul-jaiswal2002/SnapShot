
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Beaches from './component/Beaches';
import Birds from './component/Birds';
import Header from './component/Header';
import Food from './component/Food';
import Mountains from './component/Mountains';



function App() {
  return (
     <BrowserRouter>
     <Routes>
      <Route path='/' element={ <Header/>}/>
      <Route path='/mountains' element={<Mountains/>}/>
      <Route path='/beaches' element={<Beaches/>}/>
      <Route path='/birds' element={<Birds/>}/>
      <Route path='/food' element={<Food/>}/>
     </Routes>
     </BrowserRouter>

     

  );
}

export default App;
