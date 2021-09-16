import React, {Component} from 'react';
import TaskState from './util/TaskState';

class TaskItem extends Component {   
    constructor(props) {
        super(props);
        this.isChecked = this.isChecked.bind(this);
    }

    isChecked(status) {
        return status===TaskState.DONE ? true : false;
    }

    editTask(e) {
        console.log("Edit task to be implemented");
        e.preventDefault();
    }

    render() {
        const item = this.props.item;
        const checked = this.isChecked(item.status) ? 'checked' : '';
        const imageStyle = {
            height: '20px',
            width: '20px',
            verticalAlign: 'middle'
        };
        const buttonStyle = {
            position: 'absolute', 
            right: 10,
        };
        return (
            <li className={item.status}>
                <input 
                    type="checkbox"
                    value={item.id} 
                    className={item.status}                    
                    defaultChecked={checked}
                    onChange={() => this.props.toggleTaskItemStatus(item.id)} 
                    />
                {item.task}
                <span style={buttonStyle}>
                    <button onClick={()=>this.props.editTask(item.id, item.task)}>Edit</button>                
                    <button onClick={()=>this.props.deleteTask(item.id)}>Delete</button>                
                </span>
            </li>
        );
    }
}

export default TaskItem;