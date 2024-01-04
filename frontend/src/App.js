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

function App() {
  return (
    <>
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/login/shipping' element={<ShippingScreens />} />
              <Route path='/register' element={<RegisterScreens />}/>
              <Route path='/login' element={<FormScreens />} />
              <Route path='/profile' element={<ProfileScreens />} />
              <Route path='/' element={<HomeScreens />} exact />
              <Route path='/product/:id' element={<ProductScreens />} />
              <Route path='/cart/:id?' element={<CartScreens />} />
            </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
    </>
  );
}

export default App;
