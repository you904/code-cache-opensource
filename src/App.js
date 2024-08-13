import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as necessary
import { Routes, Route } from 'react-router-dom';
import Login from './components/login'
import CodeSet from './components/CodeSet';
import CodeGet from './components/CodeGet';
import SignUp from './components/SignUp';
import Addimg from './components/Addimg';
import EditUser from './components/EditUser';
import Toastify from './components/Toastify';
import Working from './components/Working';

 function App() {
  const { user } = useAuth();
  const [loginExist, setLoginExist] = useState(false);
  const [userme, setUserme] = useState(false);

  useEffect(() => {
      // const user = localStorage.getItem('YBFYBVu/12');
      const uName = localStorage.getItem('userName');
      if (user) {
          setLoginExist(true);
      }
      if (uName) {
          setUserme(true);
      }
  }, []);
  return (
    <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/setimg" element={loginExist ? <Addimg /> : <Login />} />
                <Route path="/SetCode" element={<CodeSet />} />
                <Route path="/editUser" element={<EditUser />} />
                <Route path="/GetCode" element={<CodeGet />} />
                <Route path="/Toast" element={<Toastify />} />
                <Route path="/Working" element={<Working />} />
            </Routes>
        </div>
  );
}

export default App;
