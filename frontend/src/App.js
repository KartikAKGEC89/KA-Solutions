import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Footer from './components/footer';
import Header from './components/header';
import HomeScreens from './screens/HomeScreens';
import ProductScreens from './screens/ProductScreens';
import CartScreens from './screens/CartScreens';

function App() {
  return (
    <>
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
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
