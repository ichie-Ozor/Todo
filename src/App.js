import React, { useEffect } from "react";
import { useState } from "react";
// import { render } from 'react-dom';
import "./App.css";

function App() {
  const [todo, setTodo] = useState({
    name: "",
    price: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const submitHandler = (e) => {
    console.log("na me!");
    e.preventDefault();
    if(setIsEditing){
      editHandler()
    }
    if (todo.name !== "" && todo.price !== "") {
        setTodoList((prev) => [
        ...prev,
        {
          id: new Date().getMilliseconds(),
          todo: todo.name,
          price: todo.price,
        },
      ]);
      // setTprice(todo.price);
      setTodo({
        name: "",
        price: "",
      });
    } 
    else {
      alert("Nwokem Respect yourself 😂😂🍕");
      setTodo({
        name: "",
        price: "",
      });
    }
  };

  const onNameHAndler = (e) => {
    setTodo({
      ...todo,
      name: e.target.value,
    });
  };

  const onPriceHandler = (e) => {
    setTodo({
      ...todo,
      price: e.target.value,
    });
  };

  const deleteHandler = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };
////////////////////////////////// Editing/////////////////
  const editHandler = (todo, onChange) => {
     let todoContent;
    if (!isEditing) {
     
      todoContent = (
        <>
          <input
          type="text"
            value={todo.name}
            onChange={(e) => {
              onChange({ ...todo, name: e.target.value });
            }}
          />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </>
      );
    } else {
      todoContent = (
        <>
        {todo.name}
        <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )
    }
    return (
      <label>
        {todoContent}
      </label>
    )
  };

  //////////////Total Hereee///////////////////////
  const reducer = (accumulator, currentValue) => {
     const returns = accumulator + Number(currentValue.price)
     console.log(typeof returns);
     return returns
  }

  const renderTodoList = todoList.map((value) => {
    const { todo, price, id } = value;
    return (
      <div key={id}>
        <ul>
          <span className="todo1">{todo}</span>
          <span className="price">{price}</span>
          <button onClick={() => editHandler(id)}>Edit</button>
          <button onClick={() => deleteHandler(id)}>Delete</button>
        </ul>
      </div>
    );
  });

useEffect(() => {
  document.title = 'Ozoemena'
}, [])


  return (
    <div className="App1">
      {/* TODO */}
      <form onSubmit={submitHandler}>
        <div>
          <b> Welcome </b> <small>Guest</small>
        </div>
        <div className="input">
          <input
            className="todo1"
            type="text"
            placeholder="Enter Todo"
            value={todo.name}
            onChange={onNameHAndler}
          />
          <input
            className="price"
            type="Number"
            placeholder=" Input Price"
            value={todo.price}
            onChange={onPriceHandler}
          />
        </div>
        <button className="btn">click</button>
        <div>{renderTodoList}</div>
        <div className="t">
          <h3>Total : </h3>
          <div className="total">{todoList.reduce(reducer, 0)}</div>
        </div>
      </form>
    </div>
  );
}

export default App;
