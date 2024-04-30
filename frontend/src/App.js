import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import gift_banner from './Components/Assets/gift_banner.avif';
import decoration_banner from './Components/Assets/decoration_banner.webp';
import logo_banner from './Components/Assets/logo_banner.png'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/gifts' element={<ShopCategory banner = {gift_banner} category="Gift"/>}/>
          <Route path='/decoration' element={<ShopCategory banner = {decoration_banner} category="decoration"/>}/>
          <Route path='/logo' element={<ShopCategory banner = {logo_banner} category="logo"/>}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>} />
          </Route>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
