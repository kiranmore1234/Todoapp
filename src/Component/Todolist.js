import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({ name: '', email: '', date: '' });
  const [editData, setEditData] = useState(null);

  
  const fetchTodos = async () => {
      const response = await axios.get('http://localhost:3001/todos');

      const result = response.data
      setTodos(result);
    };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!input.name || !input.email || !input.date) {
      alert('Please fill in all fields');
      return;
    }

    if (editData) {
      await axios.put(`http://localhost:3001/todos/${editData.id}`, input);
      setEditData(null); 
    } else {
      await axios.post('http://localhost:3001/todos', input);
    }

    fetchTodos();
    setInput({ name: '', email: '', date: '' }); 
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setInput(todo);
    setEditData(todo);
  };

  return (
    <>
      <div className="bg-warning w-50 mt-5 p-4 rounded-4 mx-auto">
        <h2 className="text-light fw-bold">Todo App</h2>

        <input
          type="text"
          className="form-control"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          className="form-control"
          value={input.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="date"
          className="form-control"
          value={input.date}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit} className="btn btn-primary w-25">
          Submit
        </button>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.name}</td>
                <td>{todo.email}</td>
                <td>{todo.date}</td>
                <td>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="btn btn-danger me-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="btn btn-success"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
