  import React, { Component } from 'react';
  import '../App.css'
  import AppHeader from './appHeader.js'
  import ProductsApi from '../api/hungry_axios'


  class FoodSelection extends Component {
    constructor(props){
      super(props);
      this.state = {
        name: '',
        image:'',
        view: '',
        prices: '',
        newProducts:''
      }

    }
      componentWillMount(){

        const products = [{
            name: "Masssrs bar",
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

          ProductsApi.viewName(view => {
            this.setState({
              view: view.data
            }, function(){
              console.log('names from db: ', this.state.view)
            })
          })

        ProductsApi.viewPrice(prices => {
          this.setState({
            prices: prices.data
          }, function(){
            console.log('prices from db: ', this.state.prices)
          })
        })

        ProductsApi.viewProducts(newProducts => {
          this.setState({
            newProducts: newProducts.data
          }, function(){
            console.log('products from db: ', this.state.newProducts)
          })
        })

        ProductsApi.viewImage(image => {
          this.setState({
            image: image.data
          }, function(){
            console.log('image from thre db: ', this.state.image)
          })
        })
      }

    render(){
      return(
        <div>
          <AppHeader />
          <div className='photoBlock'>
          <h2>Our New Products</h2>
            <div className='center'>

            </div>
              <Product priceProps={this.state.prices} foodProps={this.state.view} imageProps={this.state.image}/>
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
      //console.log(products[i].name,'names are working')
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

  const Product = (props) => {
    var imageStore = []
    var nameStore = []
    var priceStore = []
    var mixStore = []
    let image = props.imageProps
    let view = props.foodProps
    let prices = props.priceProps

    for(var i = 0; i < view.length;i++){
      nameStore.push(view[i])
    }
    for(var i = 0; i < prices.length;i++){
      priceStore.push(prices[i])
    }
    for(var i = 0; i < image.length; i++){
      imageStore.push(image[i])
    }
    var urlLink =  nameStore
    console.log(urlLink,'imageURLL')
    console.log(image)
    for(var i = 0; i < nameStore.length; i++){
      mixStore.push(
        <div className='imageWrapper'>
          <div className='photo'>
            <img src = {`./images/${image}`}/>
          </div>
          <div className ='nameHolder'>
            {nameStore[i]}
          </div>
          <div className ='priceHolder'>
            {priceStore[i]}
          </div>
        </div>
      )
    }
    //console.log(view,'newArray')
    return(
      <div>
        <div className='productWrapper'>
          {mixStore}
          <div className='priceWrapper'>
          </div>
        </div>
      </div>
    )
  }


  const imageView = (props) => {




    return(
<div>
</div>
    )
  }



  export default FoodSelection;
