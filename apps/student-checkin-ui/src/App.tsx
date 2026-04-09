import { Link, Routes, Route } from 'react-router-dom';
import Health from './Health';
import Home from './Home';
import Login from './pages/Login';
import TaskApp from './pages/TaskApp';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div>
      <nav>
          <Link to="/home">Home</Link> | 
          <Link to="/health">Health</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/tasks">Tasks</Link>
      </nav>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/health" element={<Health/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/tasks" element={<TaskApp/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
