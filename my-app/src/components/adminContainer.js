import React, { Component } from 'react'
import '../App.css'
import AppHeader from './appHeader.js'

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
      imageUrl: ''
    };
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('Handelling the upload process',this.state.file)

    let fileReader = new FileReader();
    let file = e.target.files[0];

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
  }
  render(){
    let imageUrl = this.imageUrl
    let imagePreview = null;
    if (imageUrl) {
      imagePreview = (<img src={imageUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    }
    console.log(imagePreview,'image')
    return(

      <div>
        <h2>Add a new product to the HungryMofos Shop</h2>
        <div className='formWrapper'>
          <div className='center'>
            <form>
              <label>
                Name:
                <input type="text" name="name" /><br />
                Price:
                <input type='text' name='price' /><br />
              </label>
            </form>
            <form >
            <label>
              Choose an Image:
              <input className='imgInsert' type='file' onChange={(e)=>this.handleSubmit(e)}/>
            </label>
            </form>
            <div>
              <img  className = 'previewImage' />
            </div>
            <input type="submit" value="Submit" alt = "Preview Image here" className='submit'/>
          </div>
        </div>
      </div>

    )
  }

}
export default AdminContainer
