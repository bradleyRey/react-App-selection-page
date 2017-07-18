import React, { Component } from 'react';
import '../App.css'
import AppHeader from './appHeader.js'


class FoodSelection extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      image:''
    }

  }
    componentWillMount(){

      const products = [{
          name: "Mars bar",
          image: require("./images/mars.png")
        },{
          name: "Snickers",
          image: require("./images/snickers.png")
        },{
          name: "Boost bar",
          image: require("./images/boost.png")
        }]

        this.setState({
          products:products,
        })
      }

  render(){
    return(
      <div>
        <AppHeader />
        <div className='photoBlock'>
        <h2>Our New Products</h2>
          <div className='center'>
            <MakeProduct nameProps={this.state.products}/>
          </div>
        </div>
      </div>
    )
  }
}       // <img className="image" src={require("images/" + this.props.image)} />


const MakeProduct = (props) => {
  var products = props.nameProps
  var i
  var row = []
  for(i=0; i < products.length; i++){
    console.log(products[i].name,'names are working')
    let imageLoad = products[i].image
    row.push(
    <div className='imageWrapper'>
      <div className='photo'>
        <img src={imageLoad} className='image'/>
      </div>
      <div className ='placeHolder'>
        {products[i].name}
      </div>
    </div>
  )
}
  return(
    <div>
      <div>
        {row}
      </div>
    </div>
  )
}


export default FoodSelection;
