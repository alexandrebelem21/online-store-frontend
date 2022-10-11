import React from 'react';
import PropTypes from 'prop-types';

class RatingForm extends React.Component {
  state = {
    email: '',
    rate: '',
    commentary: '',
    validated: true,
    ratings: [],
  };

  componentDidMount() {
    this.loadRatings();
  }

  loadRatings = () => {
    const { productId } = this.props;
    let currentList = [];
    if (productId && localStorage.getItem(productId)) {
      currentList = JSON.parse(localStorage.getItem(productId));
    }
    this.setState({
      ratings: currentList,
    });
  };

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateInputs();
    });
  };

  validateInputs = () => {
    const { email, rate } = this.state;
    let validated = true;
    if (!email) validated = false;
    if (!rate) validated = false;
    if (!email.includes('@')) validated = false;

    if (!validated) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        validated: true,
      });
    }
  };

  handleClick = () => {
    const { email, rate } = this.state;
    let validated = true;
    if (!email) validated = false;
    if (!rate) validated = false;
    if (!email.includes('@')) validated = false;

    if (!validated) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        validated: true,
      });
      this.saveRate();
    }
  };

  saveRate = () => {
    const { email, rate, commentary } = this.state;
    const { productId } = this.props;
    let currentList = [];
    if (localStorage.getItem(productId)) {
      currentList = JSON.parse(localStorage.getItem(productId));
    }
    const RateObject = {
      email,
      rate,
      commentary,
    };
    currentList.push(RateObject);
    localStorage.setItem(productId, JSON.stringify(currentList));
    this.setState({
      ratings: currentList,
    });
    this.setState({
      email: '',
      rate: '',
      commentary: '',
    });
  };

  render() {
    const { validated, ratings, email, commentary } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="product-detail-email"
            name="email"
            type="email"
            value={ email }
            onChange={ (e) => { this.handleChange(e.target); } }
            placeholder="email"
          />
          <label htmlFor="rate1">
            1
            <input
              type="radio"
              value="1"
              onChange={ (e) => { this.handleChange(e.target); } }
              name="rate"
              id="rate1"
              data-testid="1-rating"
            />
          </label>

          <label htmlFor="rate2">
            2
            <input
              type="radio"
              value="2"
              onChange={ (e) => { this.handleChange(e.target); } }
              name="rate"
              id="rate2"
              data-testid="2-rating"
            />
          </label>

          <label htmlFor="rate3">
            3
            <input
              type="radio"
              value="3"
              onChange={ (e) => { this.handleChange(e.target); } }
              name="rate"
              id="rate3"
              data-testid="3-rating"
            />
          </label>
          <label htmlFor="rate4">
            4
            <input
              type="radio"
              value="4"
              onChange={ (e) => { this.handleChange(e.target); } }
              name="rate"
              id="rate4"
              data-testid="4-rating"
            />
          </label>
          <label htmlFor="rate5">
            5
            <input
              type="radio"
              value="5"
              onChange={ (e) => { this.handleChange(e.target); } }
              name="rate"
              id="rate5"
              data-testid="5-rating"
            />
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Insira seu comentário"
            value={ commentary }
            name="commentary"
            onChange={ (e) => { this.handleChange(e.target); } }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Avaliar
          </button>
          {
            (!validated && <p data-testid="error-msg">Campos inválidos</p>)
          }
        </form>
        {
          ratings.map((rate, i) => (
            <div key={ i }>
              <p data-testid="review-card-email">{ rate.email }</p>
              <p data-testid="review-card-rating">{ rate.rate }</p>
              <p data-testid="review-card-evaluation">{ rate.commentary }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

RatingForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RatingForm;
