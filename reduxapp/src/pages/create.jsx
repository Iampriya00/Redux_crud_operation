import React, { useState } from 'react'

function create() {
   const [name , setName] = useState('')
   const [email, setEmail] = useState('')

   const handleSubmit = (event) =>{
    event.preventDefault()
   }
  return (
    <>
      <form onChange="{handleSubmit}">
      <div>
  <label htmlFor="name">Name:</label>
  <input
    type="text"
    name="name"
    className="form-control"
    onChange={(e) => setName(e.target.value)} 
  />
</div>

<div className="mt-5">
  <label htmlFor="email">Email:</label>
  <input
    type="email"
    name="email"
    className="form-control"
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

        <button>submit</button>
      </form>
    </>
  )
}

export default create
