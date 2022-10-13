import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import carrinhoDeCompras from './pages/carrinhoDeCompras';
import productList from './pages/productList';
import productDetails from './pages/productDetails';
import checkoutPage from './pages/checkoutPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/carrinho" component={ carrinhoDeCompras } />
        <Route path="/detalhes/:productId" component={ productDetails } />
        <Route path="/checkout" component={ checkoutPage } />
        <Route path="/" component={ productList } exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// mudança aleatória
