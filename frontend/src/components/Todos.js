import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { add, edit, del } from '../utilities/todoUtility';

export default function Todos() {
  const token = localStorage.getItem("jwt");

  const [todo, setTodo] = useState("");
  const [listOfTodos, setListOfTodos] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [buttonText, setButtonText] = useState("Add");
  const [editId, setEditId] = useState(-1);

  const location = useLocation();

  let { id, name } = location.state;

  const addTodoPath = `http://localhost:8080/todo/${id}/add`;
  const editTodoPath = `http://localhost:8080/todo/edit/${editId}`;
  const deleteTodoPath = "http://localhost:8080/todo/delete/";

  let count = 0;

  useEffect(() => {
    fetch(`http://localhost:8080/todo/${id}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(result => {
              setListOfTodos(result)
            });
        }
      });
  }, [id, token]);

  const addTodo = (e) => {
    e.preventDefault();
    add(addTodoPath, editId, token, setListOfTodos, listOfTodos, setErrorMessage, setTodo, todo, editTodo);
  }

  const editTodo = () => {
    edit(editId, editTodoPath, token, listOfTodos, setListOfTodos, setEditId, setButtonText, setTodo, setErrorMessage, todo);
  }

  const deleteTodo = (todoId) => {
    del(todoId, deleteTodoPath + todoId, token, listOfTodos, setListOfTodos);
  }

  const editBtn = (todoId) => {
    const myTodo = listOfTodos.filter(item => item.id === todoId)[0];

    if (myTodo) {
      setTodo(myTodo.name);
      setButtonText("Edit");
      setEditId(todoId);
    }
  }

  //for showing id of item was clicked to edit
  // useEffect(() => {
  //   console.log(editId);
  // }, [editId]);

  const todoIsDone = (todoId) => {
    fetch(`http://localhost:8080/todo/${todoId}/done`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.ok) {
          const updateTodos = listOfTodos.map(todo => {
            if (todo.id === todoId) {
              todo.done = true;
            }
            return todo;
          });
          setListOfTodos(updateTodos);
        }
      })
      .catch(e => console.log(e));
  }

  const todoIsNotDone = (todoId) => {
    fetch(`http://localhost:8080/todo/${todoId}/not_done`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.ok) {
          const updateTodos = listOfTodos.map(todo => {
            if (todo.id === todoId) {
              todo.done = false;
            }
            return todo;
          });
          setListOfTodos(updateTodos);
        }
      })
      .catch(e => console.log(e));
  }

  return (
    <div className='my-todos'>

      <h5 style={{ marginTop: "30px", color: "green" }}> "{name}" </h5>

      <div style={{ marginTop: '20px' }}>
        <form className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <input type="text" className="form-control" name="todo" placeholder='add todo'
              value={todo} onChange={e => setTodo(e.target.value)}
            />
          </div>

          {errorMessage ? <span style={{ color: '#be3144', fontSize: '14px' }}><strong>{errorMessage}</strong></span> : ''}

          <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-outline-primary" onClick={addTodo}>{buttonText}</button>
          </div>
        </form>
      </div>

      {listOfTodos.length === 0 ? (<h4 style={{ marginTop: '20px' }}>There are no todos, please add some.</h4>) :

        <table className='table table-striped table-hover'
          style={{ marginTop: '40px', width: '40vw', boxShadow: '0px 2px 18px 7px rgba(0,0,0,0.12)' }}>

          <tbody className='table-group'>

            {listOfTodos.map(todo => (
              <tr className='table-light' key={todo.id}>
                <th scope='row'>{++count}</th>
                <td>{todo.name}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'end' }}>

                    {todo.done ? <button className='btn btn-success' onClick={() => todoIsNotDone(todo.id)}>✓</button> :
                      <button className='btn btn-outline-success' onClick={() => todoIsDone(todo.id)}>Done</button>
                    }

                    <button className='btn btn-outline-info' style={{ marginLeft: '10px' }} onClick={() => editBtn(todo.id)}>Edit</button>
                    <button className='btn btn-outline-danger' style={{ marginLeft: '10px' }} onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      }

    </div>
  )
}
