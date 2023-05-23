import AppBar from './components/AppBar';
import LoggedBar from './components/LoggedBar';
import Home from './components/Home';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import MyTodos from './components/MyTodos';
import Profile from './components/Profile';
import Todos from './components/Todos';
import Activation from './components/Activation';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import './App.css';

function App() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div className='my-container'>

      <div className="app">
        <Router>
          {auth ? <LoggedBar /> : <AppBar />}

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<UserRegistration />} />
            <Route exact path="/login" element={<UserLogin />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path="/my_todos" element={<MyTodos />} />
            <Route exact path="/todos" element={<Todos />} />
            <Route exact path="/activation" element={<Activation />} />
          </Routes>

        </Router>

      </div>
    </div>
  );
}

export default App;
