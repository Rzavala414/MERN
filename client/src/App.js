import React from 'react';
import axios from 'axios';

class App extends React.Component{
  
  state = {
    title: '',
    body: ''
  };

  handleChange = event =>{
    const target = event.target;
    const name = target.name;
    const value = target.value

    this.setState({
      //this syntax is used when you dont know what key you'll use later and can inject any value into the []
      [name]: value
    })
  }

 

  submit = event => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
      })
      .catch(() => {
        console.log('Internal server error')
      });;
  }; 

  resetUserInputs = () =>{
    this.setState({
      title: '',
      body: ''
    });
  }

  render(){
    console.log('state:', this.state)
    return(
      <>
        <h1>Welcome To my App</h1>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
             />
          </div>
          <div className="form-input">
            <textarea placeholder="body" 
            name="body" 
            cols="30" 
            rows="10" 
            value={this.state.body} 
            onChange={this.handleChange}
            >

            </textarea>
          </div>
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default App;
