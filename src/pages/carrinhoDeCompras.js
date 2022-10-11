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
  
  productQuantity = (item) => {
    const { cartList } = this.state;
    const repeatedList = cartList.filter((product) => (
      product.id === item.id
    ));
    return repeatedList.length;
  };

  productIncrease = (item) => {
    const { cartList } = this.state;
    const newItemArray = cartList;
    newItemArray.push(item);
    this.setState({
      cartList: newItemArray,
    });
    this.productQuantity(item);
    localStorage.setItem('cartItems', JSON.stringify(cartList));
    console.log(newItemArray);
  };

  productDecrease = (item) => {
    itemsFromCart.forEach((product, index) => {
      if (item.id === product.id) {
        newCart[index] = updatedProduct;
      }
    });
    localStorage.setItem('shoppingCartList', JSON.stringify(newCart));
    this.setState({ cartList: newCart });
    /* const { cartList } = this.state;
    const newItemArray = cartList.filter((product) => (
      product.id === item.id
    ));
    newItemArray.splice(item, 1);
    this.setState({
      cartList: newItemArray,
    });
    this.productQuantity(item);
    localStorage.setItem('cartItems', JSON.stringify(cartList)); */
  };

  productRemove = (item) => {
    const { cartList } = this.state;
    const newItemArray = cartList.filter((product) => (item !== product));
    this.setState({
      cartList: newItemArray,
    });
    this.productQuantity(item);
    localStorage.setItem('cartItems', JSON.stringify(newItemArray));
  };

  filtredList = () => {
    const setItem = new Set();
    const { cartList } = this.state;
    return cartList.filter((item) => {
      const products = setItem.has(item.id);
      setItem.add(item.id);
      return !products;
    });
  };

  render() {
    const { length } = this.state;
    return (
      <div>
        {length === false
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <div>
              {
                this.filtredList().map((item) => (
                  <div key={ item.id }>
                    <button
                      type="button"
                      onClick={ () => this.productRemove(item) }
                      data-testid="remove-product"
                    >
                      Remover
                    </button>
                    <p data-testid="shopping-cart-product-name">{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.price}</p>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.productDecrease(item) }
                    >
                      -

                    </button>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      { this.productQuantity(item) }
                    </p>
                    <button
                      type="button"
                      onClick={ () => this.productIncrease(item) }
                      data-testid="product-increase-quantity"
                    >
                      +

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
