import React, { useState, useEffect } from 'react'
import axios from 'axios'

const endpoint = 'https://jsonbox.io/box_' + process.env.REACT_APP_JSONBOX_DB_ID

const App = () => {

  const [items, setItems] = useState([])
  const [value, setValue] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const fetchData = async () => {
    const { data, status } = await axios.get(endpoint + '/items') 
    if (status === 200) {
      setItems(data)
    }
  }

  const addItem = async e => {
    e.preventDefault()
    if (e === '') {
      return 
    } else {
      await axios.post(endpoint + "/items", { text: value }) 
      setValue('')
      fetchData()
    }
  }

  const deleteItem = async id => {
    await axios.delete(endpoint + `/items/${id}`) 
    fetchData()
  }

  const showEditControls = () => {
    return (
      <div className="edit-controls-container">EDIT CONTROLS CONTAINER</div>
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <form onSubmit={addItem} className="add-item-container">
        <input className="input-field" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter task item..." />
        <button className="btn" type="submit">add</button>
      </form>
      <div className={`edit-controls-container ${!isVisible ? "not-visible" : "visible"}`}>EDIT CONTROLS CONTAINER</div>
      {
        items.map((item, index) => {
          return (
            <div className="items-container" key="item._id">
              <div className="list-item-text">{`${index + 1}. ${item.text}`}</div>
              <button className="delete-item-icon" onClick={() => setIsVisible(!isVisible)}> {/*onClick={() => deleteItem(item._id)}*/}
                <i className="pencil alternate icon list-item-icon"></i>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
