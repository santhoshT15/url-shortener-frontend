import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/DashBoard';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';;

function App() {
  return (
    <div className="App">  
    <ToastContainer theme='colored' />
    <Routes>
      <Route exact path='/' element={ <Login/>} />

      <Route path='/dashboard' element={<Dashboard/> } />

      <Route path='/signup' element={<Signup/> } />

      <Route path='/forgot/password' element={<ForgotPassword/> } />

      <Route path='/reset/password/:token' element={<ResetPassword/> } />

    </Routes> 
    </div>
  );
}

export default App;