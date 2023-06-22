//method for adding todoName and todo
export const add = (path, editId, token, setList, list, setErrorMessage, setTodo, name, editTodo) => {
  const myTodo = { name };

  if (editId < 1) {
    fetch(path, {
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
            .then(data => {
              setList([...list, data]);
            });
          setErrorMessage("");
          setTodo("");
        } else {
          res.json()
            .then(msg => setErrorMessage(msg.message));
        }
      })
      .catch(e => console.log(e));
  } else {
    editTodo(editId);
  }
}

//method for editing todoName and todo
export const edit = (editId, path, token, list, setList, setEditId, setButtonText, setTodo, setErrorMessage, name) => {
  const updateTodo = { name }

  fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(updateTodo)
  })
    .then(res => {
      if (res.ok) {
        res.json()
          .then(data => {

            const updatedTodo = list.map(item => {
              if (item.id === editId) {
                item.name = data.name;
              }
              return item;
            });

            setList(updatedTodo);
            setEditId(-1);
            setButtonText("Add");
            setTodo("");
            setErrorMessage("");
          })
      } else {
        res.json()
          .then(data => setErrorMessage(data.message));
      }
    })
    .catch(e => console.log(e));
}

//method for deleting todoName and todo
export const del = (id, path, token, list, setList) => {
  fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(res => {
      if (res.ok) {
        const updatedItems = list.filter(item => item.id !== id);
        setList(updatedItems);
      }
    })
    .catch(e => console.log(e));
}