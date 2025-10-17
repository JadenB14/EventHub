import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from "./components/Navabar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='min-h-screen bg-sky-500'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events/:id' element={<EventDetail />} />
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/my-events' element={<MyEvents />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>  
    </BrowserRouter>
  )
}

export default App
