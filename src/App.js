import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Lost from './components/Lost';
import Post from './components/Post';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import Found from './components/Found';



function App() {
  return (
    <div className="App">
   <BrowserRouter>
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Lost" element={<Lost/>} /> 
          <Route path="/Found" element={<Found />} /> 
          <Route path="/Post" element={<Post />} /> 
          <Route path="/Contact" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
