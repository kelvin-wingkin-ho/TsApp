import { Routes, Route, Link } from 'react-router-dom';
import Health from './Health';
import Home from './Home';

function App() {
  return (
    <div>
      <nav><Link to="/home">Home</Link> | <Link to="/health">Health</Link></nav>      

      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/health" element={<Health/>}/>
      </Routes>
    </div>
  )
}

export default App
