import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import Logout from './components/Logout';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState('');

  // Hämta rollen från servern för att avgöra om användaren är inloggad eller inte
  useEffect(() => {
    axios.get('http://localhost:4001/auth/verify')
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role); // Sätt rollen i state om användaren är inloggad
        } else {
          setRole(''); // Om användaren inte är inloggad, sätt rollen till tom
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} setRole={setRole} />
      <Routes>
        <Route path='/' element={<Home setRole={setRole} />} />
        <Route path='/books' element={<Books role={role} />} />
        <Route path='/login' element={<Login setRoleVar={setRole} />} />
        <Route path='/admin-login' element={<AdminLogin setRole={setRole} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addstudent' element={<AddStudent />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/edit/:id' element={<EditBook />} />
        <Route path='/delete/:id' element={<DeleteBook />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />
      </Routes>
      <Footer role={role} />
    </BrowserRouter>
  );
}

export default App;
