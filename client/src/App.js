import React from 'react';


class App extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }
    componentDidMount(){
      fetch('/products')
      .then(res => res.json())
      .then(res => this.setState({products: res.data}));
    }
  render() {
    return (
      <div className="App">
        <h1>Products</h1>
        <ul>
          {this.state.products.map(product =>
            <li key={product.product_id}>{product.name} | {product.price}</li>
            )}
        </ul>
      </div>
    );
  }
}

export default App;
