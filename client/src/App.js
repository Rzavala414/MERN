import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component{
  
  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () =>{
    this.getBlogPost();
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) =>{
        const data = response.data;
        this.setState({posts: data});
        console.log('Data has been received');
      })
      .catch(() =>{
        alert('error retrieving data');
      })
  }

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
        this.getBlogPost();

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

  displayBlogPost = posts => {
    if(!posts.length) return null;

    return posts.map((post, index) => {
       return (<div key={index} className="blog-post-display">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>)
    });
  }

  render(){
    console.log('state:', this.state)
    return(
      <div className="app">
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
        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    )
  }
}

export default App;
