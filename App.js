import React, { Component } from 'react';
import ToDoList from './ToDoList';
import EditModal from './EditModal';
import TaskState from  './util/TaskState';
import uuid from 'react-uuid';
import Header from './Header';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.toggleTaskItemStatus = this.toggleTaskItemStatus.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.modifyTask = this.modifyTask.bind(this);
    this.openModalModifyTask = this.openModalModifyTask.bind(this);
    this.closeModalModifyTask = this.closeModalModifyTask.bind(this);
  }

  state = {
    items: [],
    editableTask: {},
    showModalEditTask: false
  };

  addItem(event) {
    event.preventDefault();
    let newTaskItem = this.newTaskInput.value.trim();
    if(newTaskItem !== "") {
      let items = this.state.items;
      items.push({
        id: uuid(),
        task: newTaskItem,
        status: TaskState.TODO
      });
      this.setState({items});
    }
    this.newTaskInput.value = "";
    this.newTaskInput.focus();
  }

  deleteItem(id) {
    let filteredItems = this.state.items.filter((item)=>item.id!==id);
    this.setState({items:filteredItems});
  }

  modifyTask(id,task) {
    let itemsCopy = this.state.items.slice();
    let index = this.state.items.findIndex((item)=>item.id===id);
    if(index>=0) {
      itemsCopy[index].task = task;
      this.setState(itemsCopy);
    }
  }

  openModalModifyTask(id, task) {
    console.log(`In App coponent, id: ${id}, task is ${task}`);
    this.setState({
      editableTask: {id,task},      
      showModalEditTask: true
    });
  }

  closeModalModifyTask() {
    this.setState({showModalEditTask: false});
  }

  toggleTaskItemStatus(id) {
    this.state.items.filter((item)=>{
      if(item.id===id) item.status = this.toggleState(item.status);
      return item;
    });
    this.setState({items:this.state.items});
  }

  toggleState(state) {
    if(state === TaskState.TODO) return TaskState.DONE;
    return TaskState.TODO;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">       
        <Header></Header>
          <div>
            <form onSubmit={this.addItem}>
              <input type="text" placeholder="Add task" ref={(ele)=>this.newTaskInput=ele} className="ToDoInput"/>
              <button type="submit" className="ToDoSubmit">Add task</button>
            </form>
          </div>
        </header>        
        <div className="App-intro">
          
          <ToDoList 
            items={this.state.items} 
            editTask={this.openModalModifyTask}
            deleteTask={this.deleteItem}
            toggleTaskItemStatus={this.toggleTaskItemStatus} />
          <EditModal
            save={this.modifyTask} 
            editableTask={this.state.editableTask}
            isOpen={this.state.showModalEditTask}
            onRequestClose={this.closeModalModifyTask} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.newTaskInput.focus();
  }
}

export default App;