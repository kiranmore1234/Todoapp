import { useState } from "react"
const Tododata = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState({ item: '', date: '', time: '' })
    const [editdate, setEditdata] = useState(null)

    const handelInput = (e) => {
        const { name, value } = e.target
        setInput((prevInput) => ({
            ...prevInput, [name]: value
        }))
    }

    const addData = () => {
        if (editdate !== null) {
            const abc = [...todos]
            abc[editdate] = { ...input, reserved: todos[editdate].reserved || false };
            setTodos(abc)
            setEditdata(null)

        } else if (input.item && input.date && input.time) {
            setTodos(
                prevTodos => [
                    ...prevTodos, { item: input.item, date: input.date, time: input.time, reserved: false }
                ]
            )
        } else {
            alert('Enter Both Values')

        }
        setInput({ item: '', date: '', time: '' })
    }

    const deleteData = (index) => {
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    const editData = (index) => {
        setInput(todos[index])
        setEditdata(index)
    }

    const toggleReserve = (index) => {
        const xyz = [...todos];
        xyz[index].reserved = !xyz[index].reserved;
        setTodos(xyz)
    }
    return (
        <div className="bg-dark fs-3">
        <div className="bg-danger bg-gradient w-50 p-4 mx-auto rounded-5 mt-5 ">
            <h2 className="text-warning">Todo Data</h2>
            <input
                type='text'
                className="form-control"
                placeholder="Enter Your Todo Data"
                name='item'
                value={input.item}
                onChange={handelInput}
            /><br />
            <input
                type='date'
                className="form-control"
                name='date'
                value={input.date}
                onChange={handelInput}
            /><br />
            <input
                type='time'
                className="form-control"
                name="time"
                value={input.time}
                onChange={handelInput}
            /><br />
            <button onClick={addData} className="btn btn-light fw-bold">Submit</button>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Item Data</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{ textDecoration: data.reserved ? 'line-through' : 'none' }}>{data.item}</td>
                                    <td style={{ textDecoration: data.reserved ? 'line-through' : 'none' }}>{data.date}</td>
                                    <td style={{ textDecoration: data.reserved ? 'line-through' : 'none' }}>{data.time}</td>
                                    <td>{data.reserved ? 'Reserved' : 'Not Reserved'}</td>
                                    <td>
                                        <button onClick={() => editData(index)} className="btn btn-success me-3">Edit</button>
                                        <button onClick={() => deleteData(index)} className="btn btn-danger me-3">Delete</button>
                                        <button onClick={() => toggleReserve(index)} className="btn btn-warning">{data.reserved ? 'Unreserve' : 'Reserve'}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default Tododata;