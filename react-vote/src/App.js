import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './pages/SignUp';
import SignUpAdmin from './pages/SignUpAdmin';
import SignIn from './pages/Signin';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signupadmin' element={<SignUpAdmin/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
