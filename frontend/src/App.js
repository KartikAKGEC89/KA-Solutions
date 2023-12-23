import './App.css';
import {Container} from 'react-bootstrap'
import Footer from './components/footer';
import Header from './components/header';
import HomeScreens from './screens/HomeScreens';

function App() {
  return (
    <>
     <Header />
      <main className='py-3'>
        <Container>
          <HomeScreens />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
