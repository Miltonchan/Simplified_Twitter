import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login_component';
import Home from './components/Home_component';
import Register from './components/Register_component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login/*" element = {<Login/>} />
        <Route path="/register/*" element = {<Register/>} />
        <Route path="/home/*" element = {<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
