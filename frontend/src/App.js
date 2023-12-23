import './App.css';
import {Container} from 'react-bootstrap'
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <>
     <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
