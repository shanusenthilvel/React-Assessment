import React, { Component } from 'react';
import './App.css';
import ListItems from'./ListItems';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [],
      currentItem: {
        text: '',
        key: '',
        isEditing: false,
        isDone:false
      }
    }
    this.handleInput = this.handleInput.bind(this); 
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.done=this.done.bind(this);
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key:Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text!==""){
      const newItems=[...this.state.items, newItem];
      this.setState({
        items: newItems,
       
        currentItem:{
          text:'',
          key : '',
          isEditing: false,
          isDone: false
        }
      })
    }
  }
  done(key){
    this.setState({
       currentItem: {
         text:'',
         key:'',
         isEditing: false,
         isDone: true
      } 
    })
   
  }
  deleteItem(key){
    const filteredItems = this.state.items.filter(item => 
      item.key!==key);
      this.setState({
        items: filteredItems
      })
  }
  setUpdate(text,key,isEditing)
  {
    const items= this.state.items;
    items.map(item =>{
      if(item.key===key)
      {
        item.text=text;
      }
    })
    this.setState({
      items:items
    })
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id= "form" onSubmit={this.addItem}>
            <input className="input"type="text" placeholder="EnterText" 
            value={this.state.currentItem.text}
            onChange={this.handleInput}/>
            <button className="button" type="submit">Add</button>
          </form>
        </header>
        <ListItems items = {this.state.items}
        done = { this.done}
        deleteItem = {this.deleteItem}
        setUpdate ={this.setUpdate}>

        </ListItems>

      </div>
    )
  }
}
