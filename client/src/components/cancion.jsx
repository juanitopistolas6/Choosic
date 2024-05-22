import { millisecondsToMinutesAndSeconds } from '../utils/minutesFormat'

/* eslint-disable no-tabs */
const Song = ({ imagen, artistas, duracion, nombre, votos, votosU }) => {
  return (
		<div>
			<div className="flex items-center bg-white border border-gray-200 rounded p-4 mb-4 relative">
				<div className="flex items-center">
						<img src={imagen} alt={nombre} className="h-16 w-16 mr-4 object-cover" />
						<div>
							<h2 className="text-lg font-semibold">{nombre}</h2>
							<p className="text-gray-600">{artistas}</p>
							<p className="text-gray-600">{millisecondsToMinutesAndSeconds(duracion)}</p>
						</div>
				</div>
				<button className="bg-emerald-500  text-white font-bold py-2 px-4 rounded float-right absolute right-6 top-4">
						Votos: {votos}
				</button>
				<button className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right absolute right-4 top-16">
						Votaste : {votosU}
				</button>
			</div>
		</div>
  )
}

export default Song
