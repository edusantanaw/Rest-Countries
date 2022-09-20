import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Nav from './pages/Nav';


function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route exact path = '/' element ={<Home />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
