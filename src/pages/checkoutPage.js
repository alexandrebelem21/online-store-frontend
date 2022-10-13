import React from 'react';
import { Redirect } from 'react-router-dom';

class checkoutPage extends React.Component {
  state = {
    cartList: [],
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    metodoPagamento: '',
    validated: true,
    completedPurchsae: false,
  };

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    if (localStorage.getItem('cartItems')) {
      const getLocal = localStorage.getItem('cartItems');
      const cartLista = JSON.parse(getLocal);
      this.setState({
        cartList: cartLista,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { nome, email, cpf, telefone, cep, endereco, metodoPagamento } = this.state;
    let validated = true;
    if (!nome) validated = false;
    if (!email) validated = false;
    if (!cpf) validated = false;
    if (!telefone) validated = false;
    if (!cep) validated = false;
    if (!endereco) validated = false;
    if (!metodoPagamento) validated = false;
    console.log(validated);

    if (!validated) {
      this.setState({
        validated: false,
      });
    } else {
      localStorage.removeItem('cartItems');
      this.setState({
        validated: true,
        completedPurchsae: true,
      });
    }
  };

  render() {
    const { cartList, validated, completedPurchsae } = this.state;
    return (
      <div>
        {cartList.length === 0
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <div>
              {
                cartList.map((item) => (
                  <div key={ item.id }>
                    <p data-testid="shopping-cart-product-name">{item.title}</p>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{item.price}</p>
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      { `Quantidade: ${item.quantity}` }
                    </p>
                  </div>
                ))
              }
              {(!validated && <p data-testid="error-msg">Campos inválidos</p>)}
              <form>
                <label htmlFor="inputFullName">
                  Nome Completo
                  <input
                    id="inputFullName"
                    data-testid="checkout-fullname"
                    type="text"
                    name="nome"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputEmail">
                  Email
                  <input
                    id="inputEmail"
                    data-testid="checkout-email"
                    type="email"
                    name="email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputCPF">
                  CPF
                  <input
                    id="inputCPF"
                    data-testid="checkout-cpf"
                    type="text"
                    name="cpf"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputPhone">
                  Telefone
                  <input
                    id="inputPhone"
                    data-testid="checkout-phone"
                    type="text"
                    name="telefone"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputCEP">
                  CEP
                  <input
                    id="inputCEP"
                    data-testid="checkout-cep"
                    type="text"
                    name="cep"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputAddress">
                  Endereço
                  <input
                    id="inputAddress"
                    data-testid="checkout-address"
                    type="text"
                    name="endereco"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="radioBoleto">
                  Boleto
                  <input
                    type="radio"
                    id="radioBoleto"
                    name="metodoPagamento"
                    value="Boleto"
                    data-testid="ticket-payment"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="radioVisa">
                  Visa
                  <input
                    type="radio"
                    id="radioVisa"
                    name="metodoPagamento"
                    value="Visa"
                    data-testid="visa-payment"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="radioMasterCard">
                  MasterCard
                  <input
                    type="radio"
                    id="radioMasterCard"
                    name="metodoPagamento"
                    data-testid="master-payment"
                    value="MasterCard"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="radioElo">
                  Elo
                  <input
                    type="radio"
                    id="radioElo"
                    name="metodoPagamento"
                    data-testid="elo-payment"
                    value="Elo"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="checkout-btn"
                  onClick={ this.handleClick }
                >
                  Finalizar
                </button>
              </form>
            </div>
          )}
        { (completedPurchsae && <Redirect to="/" />) }
      </div>
    );
  }
}

export default checkoutPage;
