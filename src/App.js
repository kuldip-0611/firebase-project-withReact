import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
function App() {
  return (
    <>
      <Toaster />

      <Routes>

        <Route path='/' element={<h1>Home</h1>}></Route>
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/register' element={<Register />} />
      </Routes>
    </>

  );
}

export default App;
