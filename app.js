/*global chrome*/
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
  // renderProducts() {
  // 	return this.props.products.map(product => {
  // 		return (
  // 			<div>
  // 				<h5>product.name</h5>
  // 				<img src={product.productImage}></img>
  // 			</div>
  // 		)
  // 	})
  // }
  render() {
    chrome.extension
      .getBackgroundPage()
      .console.log('in render', this.props.products);
    const productsHtml = this.props.products.map((product) => (
      <h5>product.name</h5>
    ));
    return (
      <div>
        <h1>App working</h1>
        {productsHtml}
      </div>
    );
  }
}
// chrome.runtime.onMessage.addListener(function (message) {
// 	chrome.extension
// 		.getBackgroundPage()
// 		.console.log('message arrives', message);
// 	if (message.type === 'PRODUCTS') {
// 		app(products);
// 	}
// });
window.addEventListener('load', function () {
  chrome.extension.getBackgroundPage().console.log('Loaded');
  app();
});

const app = () => {
  let products;
  chrome.storage.onChanged.addListener(function (changes, nonee) {
    products = changes.products.newValue.products;
    chrome.extension.getBackgroundPage().console.log(products);
    const app = document.createElement('div');
		app.id = 'root';
		document.body.appendChild(app);
    ReactDOM.render(
      <App products={products} />,
      app
    );
  });
};
