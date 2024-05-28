// src/App.jsx
import SongList from './components/SongList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: '1 0 auto' }}>
        <SongList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
