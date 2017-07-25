  import React, { Component } from 'react'
  import '../App.css'
  import AppHeader from './appHeader.js'
  import ProductsApi from '../api/hungry_axios'

  const AdminContainer = () => {
    return(
      <div>
      <AppHeader />
      <FormContainer />
      </div>
    )
  }

  class FormContainer extends Component{
    constructor(props){
      super(props);
      this.state={
        file: '',
        imageUrl: '',
        inputName: '',
        inputPrice: ''
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.sendName = this.handleSubmit.bind(this);
    }

    handleNameChange(e){
        console.log(e.target.value)
      this.setState({
        name : e.target.value,
      })
    }
    handlePriceChange(e){
        console.log(e.target.value)
      this.setState({
        prices : e.target.value
      })
    }
    sendName(e){
      this.setState({
        inputName: e.target.value,
        inputName:e.target.value
      })
    }

    handleSubmit(e){
      e.preventDefault();
      console.log('Handelling the upload process',this.state.prices)

  /*
      let fileReader = new FileReader();
      let file = e.target.files[0];
      console.log(e.target)

      fileReader.onloadend = () => {
        this.setState({
          file:file,
          imageUrl: fileReader.result
        });
      }
      var preview = document.querySelector('.previewImage')
      fileReader.addEventListener("load", function () {
        preview.src = fileReader.result;
      }, false);
      if (file) {
        fileReader.readAsDataURL(file);
        console.log(file.name)
      }
      //file ? fileReader.readAsDataUrl(file) : null
  */
    console.log('attempting to access axios...')
     ProductsApi.submitProduct(this.state.name, this.state.prices, resp => {
        console.log('response has been made', resp)
        //if error message, add to state and show error message on front end
        this.setState({
          inputName:this.state.name,
          inputPrice:this.state.prices
        },function(){
          console.log(resp,'this is resp')
          console.log('Axios has send ',this.state.name,' to the database')

        });
      })
      console.log(this.state.prices,'This is the new price')
      console.log(this.state.name,'This is the new name')
    }


    render(){
      /*
      let imageUrl = this.imageUrl
      let imagePreview = null;
      if (imageUrl) {
        imagePreview = (<img src={imageUrl} />);
      } else {
        imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
      }
      //console.log(imagePreview,'image')
  */
      return(

        <div>
          <h2>Add a new product to the HungryMofos Shop</h2>
          <div className='formWrapper'>
            <div className='center'>
              <form name='inputForm' encType='multipart/form-data' method='post'>
                <label>
                  Name:
                  <input value = {this.state.name} onChange={this.handleNameChange} type="text" placeholder='Name' /><br />
                  Price:
                  <input value = {this.state.prices} onChange={this.handlePriceChange} type='text' /><br />
                </label>
                <label>
                  Choose an Image:
                  <input className='imgInsert' type='file'/>
                </label>
                <div>
                <img className = 'previewImage' />
                </div>
                <button className='btn updateBtn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      )
    }

  }


  export default AdminContainer
