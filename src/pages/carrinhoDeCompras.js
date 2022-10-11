import React from 'react';

class carrinhoDeCompras extends React.Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
      length: false,
    };
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    if (localStorage.getItem('cartItems')) {
      const getLocal = localStorage.getItem('cartItems');
      const cartLista = JSON.parse(getLocal);
      this.setState({
        cartList: cartLista,
        length: true,
      });
    }
  };

  decrease = (item) => {
    if (item.quantity > 1) {
      const currentList = JSON.parse(localStorage.getItem('cartItems'));
      const itemToIncrease = currentList.find((i) => i.id === item.id);
      itemToIncrease.quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(currentList));
      this.setState({
        cartList: currentList,
      });
    }
  };

  increase = (item) => {
    const currentList = JSON.parse(localStorage.getItem('cartItems'));
    const itemToIncrease = currentList.find((i) => i.id === item.id);
    itemToIncrease.quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(currentList));
    this.setState({
      cartList: currentList,
    });
  };

  delete = (item) => {
    const currentList = JSON.parse(localStorage.getItem('cartItems'));
    const filteredList = currentList.filter((i) => i.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(filteredList));
    this.setState({
      cartList: filteredList,
    });
  };

  render() {
    const { cartList, length } = this.state;
    return (
      <div>
        {length === false
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <div>
              {
                cartList.map((item) => (
                  <div key={ item.id }>
                    <p data-testid="shopping-cart-product-name">{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.price}</p>
                    <button
                      type="button"
                      onClick={ () => { this.decrease(item); } }
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </button>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      { `Quantidade: ${item.quantity}` }
                    </p>
                    <button
                      type="button"
                      onClick={ () => { this.increase(item); } }
                      data-testid="product-increase-quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={ () => { this.delete(item); } }
                      data-testid="remove-product"
                    >
                      Remover
                    </button>
                  </div>
                ))
              }
            </div>
          )}
      </div>
    );
  }
}

export default carrinhoDeCompras;
