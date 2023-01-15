import React, { useState, useEffect } from 'react';
import "./style.css";

//Get the local storage data Back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodoList");
    if(lists) {
        return JSON.parse(lists);
    }else {
        return [];
    }
}



const Todo = () => {
const[inputData, setInputData] = useState("");
const[items, setItems] = useState(getLocalData());
const [isEditItem, setIsEditItem] = useState();
const [toggleButton, settoggleButton] = useState(false);

//Add the items function

const addItem = () => {
    if(!inputData) {
        alert('Please enter a input')
    } else if(inputData && toggleButton){
        setItems(
            items.map((currElem) => {
                if(currElem.id === isEditItem) {
                    return {...currElem, name: inputData};
                }
                return currElem;
            })
        )

        setInputData("");
    setIsEditItem(null);
    settoggleButton(false);
    } else {
        const newInputdata = {
            id: new Date().getTime().toString(),
            name: inputData,
        }
        setItems([...items, newInputdata])
        setInputData("")
    }
}

//Edit the item function

const editItem = (index) => {
    const item_todo_edited = items.find((currElem) => {
        return currElem.id === index;
    })
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    settoggleButton(true);

}

//delete Items function
const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
        return currElem.id !== index;
    })
    setItems(updatedItem)
}


//remove all

const removeAll = () => {
    setItems([])
}

//Adding Local Storage
useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items))
}, [items])


  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/to-do-list-svgrepo-com.svg' alt='todolist' />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                    <div className='addItems'>
                        <input type="text" 
                                placeholder="Add Items" 
                                className='form-control' 
                                value={inputData}
                                onChange={(event) => setInputData(event.target.value)}
                                />
                                {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : 
                                                (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                                }
                    </div>
                {/* Show all items */}
                    <div className='showItems'>
                    {items.map((currElem) => {
                        return (
                            <div className='eachItem' key={currElem.id}>
                            <h3>{currElem.name}</h3>
                            <div className='todo-btn'>
                            <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                            </div>
                        </div>
                        )   
                    })}
                    </div>

                {/*remove all button */}   
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CheckList</span>
                    </button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Todo