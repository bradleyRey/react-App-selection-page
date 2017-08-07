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
        image: '',
        imageUrl: '',
        inputName: '',
        inputPrice: '',
        status: ''
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.sendName = this.handleSubmit.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this)
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
        inputName:e.target.value
      })
    }

    handleImageChange(e){
        console.log(e.target.value)
        this.setState({
          image:e.target.value
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
     ProductsApi.submitProduct(this.state.name, this.state.prices, this.state.image, resp => {
        console.log('response has been made', resp)
        //if error message, add to state and show error message on front end

        if(this.state.name === undefined || this.state.prices === undefined || this.state.images === undefined){
          this.setState({
            name: '',
            prices:'',
            image: '',
            status: resp.data.success
        })}
        else{
        this.setState({
          inputName:this.state.name,
          inputPrice:this.state.prices,
          imageUrl: this.state.image,
          status:resp.data.success
        },function(){
          console.log(resp,'this is resp')
          console.log('Axios has send ',this.state.inputName,' to the database')
          console.log("Status: ", this.state.status)
        });
      }
      })
      console.log(this.state.image, 'This is the new image')
      console.log(this.state.prices,'This is the new price')
      console.log(this.state.name,'This is the new name')
      console.log('Status: ',this.state.status)
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
        <div className='wrapper'>
          <h2>Add a new product to the HungryMofos Shop</h2>
          <div className='formWrapper'>
            <div className='center'>
              <form name='inputForm' encType='multipart/form-data' method='post'>
                <label>
                  Name
                  <input value = {this.state.name} onChange={this.handleNameChange} type="text" placeholder='Name' /><br />
                </label>
                <label>
                  Price
                  <input value = {this.state.prices} onChange={this.handlePriceChange} type='text' /><br />
                  </label>
                  <label>
                  Insert
                  <input onChange={this.handleImageChange} value={this.state.image} type='text'/><br />
                </label>
                <label>
                  Choose an Image
                  <input className='imgInsert' type='file'/>
                </label>
                <div>
                <img className = 'previewImage' />
                </div>
                <button className='btn updateBtn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
              </form>
              <div className='response'>
                {this.state.status ? (
                  <p>Item has been sent to the Products Page!</p>
                ) : (
                  <p>Not all fields have been set, please fill in all the fields</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default AdminContainer
