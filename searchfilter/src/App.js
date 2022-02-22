import React, {useEffect, useState} from 'react'
import { Users } from './user'
import './App.css'
import {Table} from './Table'
import axios from 'axios'


function App() {

  const [query, setQuery] = useState("")
  const[data, setData] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:5000/?q=${query}`)
      setData(res.data)
    }
    if(query.length === 0 || query.length > 2) fetchUsers()
  }, [query])

  const keys = ['first_name', 'last_name', 'email']

  const search = (data) => {
    return data.filter((item) => 
        keys.some((key) => item[key].toLowerCase().includes(query))
      )
  }

  return (
    <div className='App'>

      <h1>
        <code>Multi-Function React API Search Filter</code>
      </h1>

      <input 
        type="text" 
        placeholder='Search...' 
        className='search' 
        onChange={e=>setQuery(e.target.value.toLowerCase())} />

      <br />
      <small style={{color:"grey", textAlign: "left"}}>Type more than 2 characters to see the final result</small>
      <hr width="50" />
      
      <div className="container">
        <div className="row">
        <small className='ms-auto'>Total Records: <code><h5>{ Users.length}</h5></code></small>
          <div className="col-md-8 m-auto">
            <Table data={data} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App