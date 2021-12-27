import React, { useEffect, useState } from 'react'

const ListTodos = () => {
  const [todos, setTodos] = useState([])

  const updateTodoStatus = async ({ todo_id, is_completed }) => {
    try {
      const body = { is_completed: !is_completed ? 1 : 0 }
      const response = await fetch(`http://localhost:5000/todos/status/${todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const jsonData = await response.json()
      setTodos(
        todos.map((todo) => {
          if (todo.todo_id === todo_id) {
            return { ...todo, is_completed: !is_completed }
          }
          return todo
        }),
      )
    } catch (err) {
      console.error(err.message)
    }
  }

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      })
      const jsonData = await response.json()
      setTodos(todos.filter((todo) => todo.todo_id != id))
    } catch (err) {
      console.error(err.message)
    }
  }
  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos')
      const jsonData = await response.json()

      setTodos(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])
  if (!todos.length) {
    return <h3 className="mt-6 text-center">START CREATING YOUR TODOS!</h3>
  }
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.todo_id} className="flex mb-4 items-center">
          <p
            className={`w-full ${todo.is_completed ? 'line-through text-green' : 'text-grey-darkest'}`}
          >
            {todo.description}
          </p>
          <button
            className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white ${
              todo.is_completed
                ? 'text-grey border-grey hover:bg-grey'
                : 'text-green border-green hover:bg-green'
            }`}
            onClick={updateTodoStatus.bind(this, todo)}
          >
            {todo.is_completed ? 'Not Done' : 'Done '}
          </button>
          <button
            className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
            onClick={removeTodo.bind(this, todo.todo_id)}
          >
            Remove
          </button>
        </div>
      ))}{' '}
    </>
  )
}

export default ListTodos
