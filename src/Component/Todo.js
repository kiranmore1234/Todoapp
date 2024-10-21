import { useState } from 'react'
const Todo = () => {
    const [input, setInput] = useState('')
    const [todo, setTodo] = useState([])
    const [editdata, setEditdata] = useState(null)

    const addData = () => {
        if (editdata !== null) {
            const abc = [...todo]
            abc[editdata] = input
            setTodo(abc)
            setEditdata(null)
        } else if (input.trim() === '') {
            alert('Enetr Vaild Data')
        } else {
            setTodo([...todo, input])

        }
        setInput('')
    }

    const deleteData = (index) => {
        const newTodo = [...todo]
        newTodo.splice(index, 1)
        setTodo(newTodo)
    }

    const editData = (index) => {
        setInput(todo[index])
        setEditdata(index)
    }
    return (
        <div className="bg-dark w-50 mt-5 mx-auto rounded-5 p-5">
            <h2 className="text-warning">TO DO APP </h2>
            <input
                type='text'
                className="p-2 w-50 rounded-3 fw-bold fs-5"
                placeholder="Enter Your Todo Data"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            /><br />
            <button onClick={addData} className="mt-3 btn btn-danger ">Add Data</button>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>List Item</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todo.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data}</td>
                                    <td>
                                        <button className='btn btn-danger me-2' onClick={() => editData(index)}>Edit</button>
                                        <button className='btn btn-success' onClick={() => deleteData(index)}>Delete</button>
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
export default Todo;