import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import RatingForm from '../components/RatingForm';

class productDetails extends React.Component {
  state = {
    productObject: {},
  };

  componentDidMount() {
    const { match } = this.props;
    const { productId } = match.params;
    getProductById(productId)
      .then((productObject) => {
        this.setState({
          productObject,
        });
      });
  }

  addToCart = (productObject) => { // Refatorar no futuro para evitar repetição de função productList x productDetails
    // const { cartItems } = this.state;
    const { title, thumbnail, price, id } = productObject;
    let currentList = [];
    if (localStorage.getItem('cartItems')) {
      currentList = JSON.parse(localStorage.getItem('cartItems'));
    }
    const newObj = { id, title, thumbnail, price, quantity: 1 };
    const newArray = [...currentList, newObj];
    localStorage.setItem('cartItems', JSON.stringify(newArray));
  };

  render() {
    const { productObject } = this.state;
    const { title, thumbnail, price } = productObject;
    const { match: { params: { productId } } } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-price">{ `R$ ${price}` }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de compras</Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(productObject) }
        >
          Adicionar ao carrinho
        </button>
        <RatingForm productId={ productId } />
      </div>
    );
  }
}

productDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default productDetails;
