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
        inputPrice: '',
        image: '',
        status: ''

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
      const files = this.filesInput.files;
      var fd = new FormData();
      fd.append('file', files);
      fd.append('name', this.state.name);
      fd.append('price', this.state.prices);
      for(var pair of fd.entries()) {
        console.log(pair[0]+ ' : '+ pair[1]);
      }
      console.log(files)

      console.log(fd.entries(),'the new form data')
      console.log('attempting to access axios...')



      ProductsApi.submitProduct(fd, resp => {
        console.log('response has been made', resp)

        /*this.setState({
          file:this.state.file,
          inputName:this.state.name,
          inputPrice:this.state.prices,
          status:"Information has been sent!",
          error: false
        },function(){
          console.log(resp,'this is resp')
          console.log('Axios has send ',this.state.name,' to the database')
        });*/
    //  }
      });


      console.log(this.state.prices,'This is the new price')
      console.log(this.state.name,'This is the new name')
      console.log(this.state, 'whole state')

    /*ProductsApi.submitImages(this.state.file, response => {
        console.log('axios has been notified to submit an image...')
        this.setState({
          file: this.state.file
        },function(){
          console.log('Image submission axios response details are as follows: ', response)
          console.log(this.state.file, ': has been sent to the db')
          let image = new FormData
        })
    })*/
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
              <form name='inputForm'type= "multipart/form-data">
                <label>
                  Name:
                  <input value = {this.state.name} onChange={this.handleNameChange} type="text" placeholder='Name' name = 'name' /><br />
                  Price:
                  <input value = {this.state.prices} onChange={this.handlePriceChange} type='text' name = 'prices'/><br />
                </label>
                <label>
                  Choose an Image:
                  <input
                    type="file"
                    ref={(input) => { this.filesInput = input} }
                    name="file"
                  />
                </label>
                <div>
                <img className = 'previewImage' value={this.state.image}/>
                </div>
                <button className='btn updateBtn' onClick={(e) => this.handleSubmit(e)}>Submit</button>
              </form>
              <div className='response'>
                {this.state.error ? (
                  <p>{this.state.status}</p>
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

  }


  export default AdminContainer
