import React from 'react';
import Header from './components/header';
import List from './components/list';
import Footer from './components/footer';
import './App.css';

function App() {
  // Data produk yang tetap
  const products = [
    'Handphone',
    'Laptop', 
    'Komputer',
  ];

  return (
    <div className="app">
      <Header />
      <main className="content">
        <List 
          products={products}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;