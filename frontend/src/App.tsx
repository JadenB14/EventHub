import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events/:id' element={<EventDetail />} />
        <Route path='/create' element={<CreateEvent />} />
      </Routes>
    </Router>
  )
}

export default App
