import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
import Header from './components/Header';
import List from './pages/List';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import Order from './pages/Order';
import ViewOrder from './pages/ViewOrder';
function App() {
  return (
    <>
      <Toaster />
      <Header />

      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/register' element={<Register />} />
        <Route path='/book/list' element={<List />} />
        <Route path='/book/view/:id' element={<DetailPage />}/>
        <Route path='/book/orders' element={<Order />}/>
        <Route path='/book/orders/:id' element={<ViewOrder />} />
      </Routes>

      
    </>

  );
}

export default App;
