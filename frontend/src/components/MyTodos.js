import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function MyTodos() {
  const token = localStorage.getItem("jwt");
  const [todoList, setTodoList] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActiv] = useState();
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
    const todo = { name };

    fetch("http://localhost:8080/todos_name/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(todo)
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => setName(data.name));
          setIsActiv(true);
          window.location.reload(false);
        } else if (!res.ok) {
          res.json()
            .then(msg => setErrorMessage(msg.message));
          setIsActiv(false);
        }
      })
      .catch(e => console.log(e));
  }

  const deleteTodo = (id) => {
    fetch(`http://localhost:8080/todos_name/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => {
        if (!res.ok) {
          res.json()
            .then(result => console.log(result.message));
        } else if (res.ok) {
          console.log("deleted");
        }
      })
      .catch(e => console.log(e));
    window.location.reload(false);
  }

  const goToTodo = (id) => {
    navigate('/todos', { state: { id } });
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

              <div className="col-12">
                <button type="submit" className="btn btn-outline-primary" onClick={addTodoName}>Add</button>
              </div>
            </form>
          </div>


          <table className='table table-striped table-hover'
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

          </table>

        </> : <h4>{errorMessage}</h4>}

    </div>

  )
}
