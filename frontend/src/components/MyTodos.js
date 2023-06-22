import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { add, edit, del } from '../utilities/todoUtility';
import '../App.css';

export default function MyTodos() {
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActiv] = useState();

  const [buttonText, setButtonText] = useState("Add");
  const [editId, setEditId] = useState(-1);

  const addTodoNamePath = "http://localhost:8080/todos_name/add";
  const editTodoNamePath = `http://localhost:8080/todos_name/edit/${editId}`;
  const deleteTodoNamPath = "http://localhost:8080/todos_name/delete/";

  const navigate = useNavigate();
  let count = 0;

  useEffect(() => {
    fetch("http://localhost:8080/user/my_todos", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(result => setTodoList(result))
          setIsActiv(true);
        } else if (!res.ok) {
          res.json()
            .then(msg => setErrorMessage(msg.message));
          setIsActiv(false);
        }
      })
      .catch(e => console.log(e.message));
  }, [token]);

  const addTodoName = (e) => {
    e.preventDefault();
    add(addTodoNamePath, editId, token, setTodoList, todoList, setErrorMessage, setName, name, editTodoName);
  }

  const editTodoName = () => {
    edit(editId, editTodoNamePath, token, todoList, setTodoList, setEditId, setButtonText, setName, setErrorMessage, name);
  }

  const deleteTodoName = (id) => {
    del(id, deleteTodoNamPath + id, token, todoList, setTodoList)
  }

  const editBtn = (id) => {
    const todoName = todoList.filter(todo => todo.id === id)[0];

    if (todoName) {
      setEditId(id)
      setName(todoName.name);
      setButtonText("Edit");
    }
  }

  // useEffect(() => {
  //   console.log(name);
  //   console.log(editId);
  // }, [name, editId]);

  const goToTodo = (id, name) => {
    navigate('/todos', { state: { id, name } });
  };

  return (

    <div className='my-todos'>

      {isActive ?
        <>
          <div style={{ marginTop: '20px' }}>
            <form className="row row-cols-lg-auto g-3 align-items-center">
              <div className="col-12">
                <input type="text" className="form-control" name="name" placeholder='add name of todo'
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errorMessage ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{errorMessage}</strong></span> : ''}

              <div className="col-12">
                <button type="submit" className="btn btn-outline-primary" onClick={addTodoName}>{buttonText}</button>
              </div>
            </form>
          </div>

          {/* table layout: */}
          {/* <table className='table table-striped table-hover'
            style={{ marginTop: '40px', width: '55vw', boxShadow: '0px 2px 18px 7px rgba(0,0,0,0.12)' }}>

            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name of todo</th>
                <th scope='col'>Options</th>
              </tr>
            </thead>

            <tbody className='table-group-divider'>

              {todoList.map(todo => (
                <tr className='table-light' key={todo.id}>
                  <th scope='row'>{++count}</th>
                  <td>{todo.name}</td>
                  <td>
                    <button className='btn btn-outline-primary' style={{ marginRight: '10px' }} onClick={() => goToTodo(todo.id)}>View</button>
                    <button className='btn btn-outline-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table> */}

          {/* grid layout: */}
          <div className='todos'>
            {todoList.map(todo => (

              <div className='todo' key={todo.id}>

                <div className='name'>
                  <h5 style={{ color: "gray" }}>{++count}.</h5>
                  <h6 style={{ color: "black" }}>{todo.name}</h6>
                </div>

                <div className='btns'>
                  <button className='btn btn-outline-primary' style={{ marginRight: '10px' }} onClick={() => goToTodo(todo.id, todo.name)}>View</button>
                  <button className='btn btn-outline-info' style={{ marginRight: '10px' }} onClick={() => editBtn(todo.id)}>Edit</button>
                  <button className='btn btn-outline-danger' onClick={() => deleteTodoName(todo.id)}>Delete</button>
                </div>
              </div>

            ))}
          </div>

        </> : <h4>{errorMessage}</h4>}

    </div>

  )
}
