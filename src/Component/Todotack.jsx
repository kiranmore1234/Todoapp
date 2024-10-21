import React from 'react'
import { useState } from 'react';
const Todotack = () => {

    const [todos,setTodos] = useState([]);
    const [input,setInput] = useState({ name : '', email : '', password : '' });
    const [editData,setEditData] = useState(null);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInput((prevInput)=>({
          ...prevInput,[name] : value
        }))
    }

    const addData = () =>{
       if(editData !== null) {
        const abc = [...todos]
        abc[editData] = {...input }
        setTodos(abc)
        setEditData(null)
       } else if(input.name && input.email && input.password) {
         setTodos(
          prevTodos => [
            ...prevTodos, {name : input.name, email : input.email, password : input.password}
          ]
       )
       }else{
        alert('Enter Both Values')
       }
       setInput({name : '', email : '', password : ''})
    }

    const DeleteData = (index) =>{
      const newTodo = [...todos]
      newTodo.splice(index,1)
      setTodos(newTodo)
    }

    const EditData = (index) =>{
     setInput(todos[index])
     setEditData(index)
    }
  return (
    <div className='w-50 bg-dark text-light rounded-4 mx-auto p-3 mt-5'>
        <h1>Todos List</h1>
       
       <input
       type='text'
       className='form-control mb-3'
       name='name'
       value={input.name}
       onChange={handleChange}
       />
       
       <input
       type='email'
       className='form-control mb-3'
       name='email'
       value={input.email}
       onChange={handleChange}
       />

       <input
       type='password'
       className='form-control'
       name='password'
       value={input.password}
       onChange={handleChange}
       />
       <br/>
       <button onClick={addData} className='btn btn-outline-primary mb-3'>Add data</button>
       <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((emp, index)=>{
              return(
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.password}</td>
                  <td>
                    <button onClick={()=>EditData(index)}  className='btn btn-outline-danger me-2'>Edit</button>
                    <button onClick={()=>DeleteData(index)} className='btn btn-outline-primary'>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
       </table>
    </div>
  )
}

export default Todotack;