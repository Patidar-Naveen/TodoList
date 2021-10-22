import React from 'react'

export default function TodoList() {
    return (
        <div className="container-fluid">
            <h2 className="text-center mt-3">Todo List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>List</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-info">
                    <td>Mobile</td>
                    <td>fd</td>
                </tbody>
            </table>
        </div>
    )
}
