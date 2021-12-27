import React, { useState } from 'react'

const InputTodo = () => {
  const [description,setDescription] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try{
      if(description === '') {
        alert('Input a text')
        return Promise.reject(new Error('Form is empty'))
      }
      const body = { description }
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify(body),
      })

      window.location = "/"
    }catch(err) {
      console.error(err.message)
    }
  }
  const onUpdateDescription = e => 
    setDescription(e.target.value)
  return (
    <div className="mb-4">
      <h1 className="text-grey-darkest text-center">PERN - Todo List</h1>
      <form onSubmit={onSubmitForm} className="flex mt-4">
        <input  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" type="text"  value={description} onChange={onUpdateDescription} />
        <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal" type="submit">Add</button>
      </form>
    </div>
  )
}

export default InputTodo
