import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// main component
class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   loaded: false,
    //   data: null,
    // };
  }
  getProducts() {
    const productsListContainer = document.getElementById('lpBloc');
    console.log(productsListContainer);
	}
	renderProducts() {
		return this.props.products.map(product => {
			return (
				<div>
					<h5>product.name</h5>
					<img src={product.productImage}></img>
				</div>
			)
		})
	}
  render() {
    return (
      <div>
        <h1>App working</h1>
        {this.renderProducts}
      </div>
    );
  }
}
window.addEventListener('load', function () {
  chrome.extension.getBackgroundPage().console.log('Loaded');
	chrome.runtime.onMessage.addListener(function (message) {
		if (message.type === 'PRODUCTS') {
			app(products);
		}
	});
});

const app = (products) => {
  ReactDOM.render(<App products={products} />, document.getElementById('root'));
};
