/* eslint-disable no-tabs */
import { useState } from 'react'

const SearchBar = (props) => {
  const [input, setInput] = useState('')

  const handleSearchSong = () => {
    console.log('asd')
    props.socket.emit('searchSong', { roomCode: props.roomCode, query: input })
  }
  return (
    <div>
			<input className="" type="text" name="queryInput" onChange={(e) => { setInput(e.target.value) }}/>
			<button className = "bg-white"onClick={handleSearchSong}>Buscar </button>
    </div>
  )
}

export default SearchBar
