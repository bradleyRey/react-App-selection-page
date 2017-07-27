  import axios from 'axios';

  class ProductsApi {

    static submitProduct(fd,callback){
        console.log('Submit product', fd)
        axios.post('http://localhost:8082/api/submitProduct', {fd: fd})
          .then( response => {
          callback(response)
          console.log(response,'RESPONSE HAS BEEN MADE')
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
    /*
    static submitImages(file,callback){
      axios.post('http://localhost:8082/api/submitImage',{file: file, val: 'dfds'})
        .then( response => {
          return callback(response)
          console.log('response has been made,', file,'has been recieved by axios')
      })
    }*/
  }


  export default ProductsApi;
