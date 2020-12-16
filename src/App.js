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
    setIsVisible(false)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <form onSubmit={addItem} className="add-item-container">
        <input className="input-field" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter task item..." />
        <button className="add-item-btn" type="submit">add</button>
      </form>

      {
        items.map((item, index) => {
          return (
            <div className={`item-wrapper ${!isVisible ? "" : "item-wrapper-bigger"}`} key="item._id">
              <div className="item-container">
                <div className="list-item-text">{`${index + 1}. ${item.text}`}</div>
                <button className="edit-item-btn" onClick={() => setIsVisible(!isVisible)}> {/*onClick={() => deleteItem(item._id)}*/}
                  <i class="pencil alternate icon icons"></i>
                </button>
              </div>
              <div className={`edit-controls-container ${!isVisible ? "not-visible" : "visible"}`}>
                <i class="save outline icon icons"></i>
                <i className="trash alternate outline icon icons" onClick={() => deleteItem(item._id)}></i> {/* Add confirmation for delete here */}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
