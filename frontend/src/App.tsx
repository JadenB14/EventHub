import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from "./components/Navabar";
import UserHome from "./pages/UserHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='min-h-screen bg-gray-300'>
        <Routes>
          <Route path='/home' element={<UserHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events/:id' element={<EventDetail />} />
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>  
    </BrowserRouter>
  )
}

export default App
