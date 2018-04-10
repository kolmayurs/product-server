import React from 'react';


class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            products: [],
            product:{
              name: '',
              price: 0
            }
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.addProducts = this.addProducts.bind(this);

    }
    componentDidMount(){
      this.getProducts();
    }
    getProducts(){
      fetch('/products')
      .then(res => res.json())
      .then(res => this.setState({products: res.data}));
    }
    onChangeName(e){
      this.setState({
        ...this.state.product,
        product:{
          name: e.currentTarget.value
        }
      });
    }
     onChangePrice(e){
      this.setState({
        ...this.state.product,
        product:{
          price: e.currentTarget.value
        }
      });
    }


    addProducts(){
      console.log(this.state.product.name + ' | ' + this.state.product.price);
      fetch('/products/add?name='+this.state.product.name+'&price='+this.state.product.price)
      .then(this.getProducts)
      .catch(err => console.error(err));
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
        <div>
          <input value={this.state.product.name} onChange= {this.onChangeName.bind(this)} />
          <input value={this.state.product.price} onChange= {this.onChangePrice.bind(this)}  />
          <button onClick={this.addProducts.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}

export default App;
