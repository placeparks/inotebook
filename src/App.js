import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <NoteState>
 <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;