import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Todos() {
  const token = localStorage.getItem("jwt");
  const [todo, setTodo] = useState("");
  const [listOfTodos, setListOfTodos] = useState([]);
  const location = useLocation();
  let { id } = location.state;
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
            .then(todo => { setListOfTodos(todo) });
        }
      });
  }, [id, token]);

  const addTodo = (e) => {
    e.preventDefault();
    const myTodo = { todo };

    fetch(`http://localhost:8080/todo/${id}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(myTodo)
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => setTodo(data.todo));
          window.location.reload(false);
        } else if (!res.ok) {
          res.json()
            .then(msg => console.log(msg.message));
        }
      })
      .catch(e => console.log(e));
  }

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
          window.location.reload(false);
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
          window.location.reload(false);
        }
      })
      .catch(e => console.log(e));
  }

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:8080/todo/delete/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => {
        if (!res.ok) {
          res.json()
            .then(result => console.console.log(result.message));
        } else if (res.ok) {
          console.log(id + " deleted");
          window.location.reload(false);
        }
      })
  }

  return (
    <div className='my-todos'>

      <div style={{ marginTop: '20px' }}>
        <form className="row row-cols-lg-auto g-3 align-items-center">
          <div className="col-12">
            <input type="text" className="form-control" name="todo" placeholder='add todo'
              value={todo} onChange={e => setTodo(e.target.value)}
            />
          </div>

          <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-outline-primary" onClick={addTodo}>Add</button>
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
                <td>{todo.todo}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'end' }}>

                    {todo.done ? <button className='btn btn-success' onClick={() => todoIsNotDone(todo.id)}>✓</button> :
                      <button className='btn btn-outline-success' onClick={() => todoIsDone(todo.id)}>Done</button>
                    }

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
