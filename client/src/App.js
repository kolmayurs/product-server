import React from 'react';
import './style.css'

class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            name: '',
            price:0,
            edit: false,
            oldname: ''
        }
         this.getProducts = this.getProducts.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.addProducts = this.addProducts.bind(this);
        this.delProducts = this.delProducts.bind(this);
        this.editProducts = this.editProducts.bind(this);
        this.upadetProducts = this.upadetProducts.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
    }


    componentDidMount(){
      this.getProducts();
    }
    getProducts(){
      this.setState({loading: true})
      fetch('/products')
      .then(res => res.json())
      .then(res => this.setState({products: res.data,loading: false, name: '', price:0}));
    }
    onChangeName(e){
      this.setState({
          name: e.currentTarget.value
      });
    }
     onChangePrice(e){
      this.setState({
          price: Number(e.currentTarget.value)
      });
    }


    addProducts(){
      this.setState({loading: true})
      fetch('/products/add?name='+this.state.name+'&price='+Number(this.state.price))
      .then(this.getProducts)
      .catch(err => console.error(err));
    }
    delProducts(name){
      this.setState({loading: true})
      fetch('/products/delete?name='+name)
      .then(this.getProducts)
      .catch(err => console.error(err));
    }
    editProducts(name, price){
      this.setState({edit: true, name: name, price: Number(price), oldname: name});
    }

    upadetProducts(name){
       this.setState({loading: true})
      fetch('/products/update?oldname='+name+'&name='+this.state.name+'&price='+Number(this.state.price))
      .then(this.getProducts)
      .catch(err => console.error(err));
      this.setState({edit: false, name: '', price:0});
    }
    cancelUpdate(){
      this.setState({edit: false, name: '', price: 0});
    }
  render() {
    if(this.state.loading){
      return(<h1>Loading...</h1>)
    }
    let Button = <button onClick={this.addProducts.bind(this)}>ADD</button>;
    if(this.state.edit){
      Button = (<div className="inline-block">
        <button onClick={this.upadetProducts.bind(this, this.state.oldname)}>Update</button>
        <button onClick={this.cancelUpdate.bind(this)}>Cancel</button>
        </div>)
    }
    else{
      Button = (<div className="inline-block">
        <button onClick={this.addProducts.bind(this)}>ADD</button>
        </div>)
    }
    const products_data = this.state.products.map((product,i) => {
     /* <ul>
          {this.state.products.map((product,i) =>
            <li key={'product_'+i}>{product.name} | {product.price} <button  onClick={this.editProducts.bind(this, product.name, product.price)}>Edit</button>  <button  onClick={this.delProducts.bind(this, product.name)}>Delete</button></li>
            )}
        </ul>*/
      return(<tr key={'product_'+i}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><button  onClick={this.editProducts.bind(this, product.name, product.price)}>Edit</button></td>
              <td><button  onClick={this.delProducts.bind(this, product.name)}>Delete</button></td>
        </tr>)
    })
    return (
      <div className="App">
        <h1>Products</h1>
          <div className="input-section">
            <input value={this.state.name} Placeholder="Enter Name Here..." onChange= {this.onChangeName.bind(this)} />
            <input value={this.state.price} Placeholder="Enter Price Here..." onChange= {this.onChangePrice.bind(this)}  />
          {Button}
          </div>
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action_Edit</th>
                <th>Action_Delete</th>
              </tr>
            </thead>
            <tbody>
              {products_data}
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
