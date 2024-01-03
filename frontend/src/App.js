import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Footer from './components/footer';
import Header from './components/header';
import HomeScreens from './screens/HomeScreens';
import ProductScreens from './screens/ProductScreens';
import CartScreens from './screens/CartScreens';
import FormScreens from './screens/FormScreens.jsx';

function App() {
  return (
    <>
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/login' element={<FormScreens />}/>
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
