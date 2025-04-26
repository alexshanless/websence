import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

const PlaceholderSection = ({ id, title, minHeight = '70vh' }) => (
  <section
    id={id}
    style={{
      minHeight: minHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid #eee', // Separator
      padding: '40px 20px',
      backgroundColor: id === 'about' ? '#f9f9f9' : '#fff', // Alternate background example
    }}
  >
    <h2>{title} Section</h2>
  </section>
);

function App() {
  return (
    <div className='site-wrapper'>
      <Hero />
      <Navbar />
      <PlaceholderSection id='services' title='Services' />
      <PlaceholderSection id='about' title='About' />
    </div>
  );
}

export default App;
