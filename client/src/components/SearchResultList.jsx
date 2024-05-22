import SearchResult from './SearchResults'

const SearchResultsList = ({ tracks, setSearchTracks, roomCode, socket }) => {
  return (
        <div>
            <div className="overflow-scroll h-80">
                {tracks.map((track) => {
                  // eslint-disable-next-line react/jsx-key
                  return <SearchResult
                    socket={socket}
                    setSearchTracks= {setSearchTracks}
                    name={track.name}
                    uri={track.uri}
                    duracion={track.duration}
                    artista={track.artist}
                    imagen={track.imagen}
                    roomCode={roomCode}
                  />
                })}
            </div>
        </div>
  )
}

export default SearchResultsList
