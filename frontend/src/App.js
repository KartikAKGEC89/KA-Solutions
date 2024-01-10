import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Footer from './components/footer';
import Header from './components/header';
import HomeScreens from './screens/HomeScreens';
import ProductScreens from './screens/ProductScreens';
import CartScreens from './screens/CartScreens';
import FormScreens from './screens/FormScreens.jsx';
import RegisterScreens from './screens/RegisterScreens.jsx';
import ProfileScreens from './screens/ProfileScreens.jsx';
import ShippingScreens from './screens/shippingScreens.jsx';
import PaymentScreens from './screens/PaymentScreens.jsx';
import PlaceOrderScreens from './screens/PlaceOrderScreens.jsx';
import OrderScreens from './screens/OrderScreens.jsx';
import AdminScreen from './screens/AdminScreen.jsx';
import AdminProductScreen from './screens/AdminProductScreen.jsx';
import UpdateProductScreen from './screens/UpdateProductScreen.jsx';

function App() {
  return (
    <>
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/admin/product' element={<AdminProductScreen />} />
              <Route path='/admin' element={<AdminScreen />} />
              <Route path='/order/:id' element={<OrderScreens />} />
              <Route path='/placeorder' element={<PlaceOrderScreens />} />
              <Route path='/payment' element={<PaymentScreens />} />
              <Route path='/login/shipping' element={<ShippingScreens />} />
              <Route path='/register' element={<RegisterScreens />}/>
              <Route path='/login' element={<FormScreens />} />
              <Route path='/profile' element={<ProfileScreens />} />
              <Route path='/' element={<HomeScreens />} exact />
              <Route path='/product/:id' element={<ProductScreens />} />
              <Route path='/cart/:id?' element={<CartScreens />} />
              <Route path='/create' element={<UpdateProductScreen/>} />
            </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
    </>
  );
}

export default App;
