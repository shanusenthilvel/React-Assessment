import React from 'react';
import './ListItems.css';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item => {
        return <div className="list" key={item.key}>
            <p>
                <input type ="text" id={item.key} value={item.text}
                onChange={
                    (e) =>{
                        props.setUpdate(e.target.value,item.key)
                    }}
                    />
                    <span>
                <button className="bttn" onClick={ () => props.done(item.key)}>Done </button>
                <button className="bttn" onClick={ () => props.deleteItem(item.key)}>Delete </button>
                <button className="bttn">Edit </button>
                </span>
            </p>
        </div>
    })
    return(
        <h1>{listItems}</h1>
    )
}
export default ListItems;