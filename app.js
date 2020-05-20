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
  render() {
    return (
      <div>
        <h1>App working</h1>
        <button onclick="getProducts">Test</button>
      </div>
    );
  }
}
window.addEventListener('load', function () {
  chrome.extension.getBackgroundPage().console.log('Loaded');
  // getting the products list container (ul tag)
  const productsListContainer = document.getElementById('lpBloc');
  chrome.extension.getBackgroundPage().console.log(productsListContainer);
  app();
});

const app = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};
