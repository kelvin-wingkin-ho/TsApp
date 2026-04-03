import { Link, Routes, Route } from 'react-router-dom';
import Health from './Health';
import Home from './Home';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <nav>
          <Link to="/home">Home</Link> | 
          <Link to="/health">Health</Link> | 
          <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/health" element={<Health/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
