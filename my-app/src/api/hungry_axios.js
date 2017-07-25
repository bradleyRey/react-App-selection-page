import axios from 'axios';

class ProductsApi {

  static submitProduct(name,prices,callback){

      axios.post('http://localhost:8082/api/submitProduct', {name: name, prices: prices})
        .then( response => {
        callback(response)
        console.log(response,'RESPONSE HAS BEEN MADE')
        console.log(name,': the name from the axios')
    })
  }
  static viewName(callback){
    axios.post('http://localhost:8082/api/retrieveName')
      .then( response => {
        return callback(response)
    })
  }
  static viewPrice(callback){
    axios.post('http://localhost:8082/api/retrievePrice')
      .then( response => {
        return callback(response)
    })
  }
  static viewProducts(callback){
    axios.post('http://localhost:8082/api/retrieveProducts')
      .then( response => {
        return callback(response)
    })
  }
  static submitImages(image,callback){
    axios.post('http://localhost:8082/api/submitImage',{image: image})
      .then( response => {
        return callback(response)
        console.log('response has been made,', image,'has been recieved by axios')
    })
  }
}


export default ProductsApi;
