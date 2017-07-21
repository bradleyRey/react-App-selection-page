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
  static viewProducts(callback){
    axios.post('http://localhost:8082/api/retrieveProducts')
      .then( response => {
        return callback(response)
    })
  }
}


export default ProductsApi;
