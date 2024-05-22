import { millisecondsToMinutesAndSeconds } from '../utils/minutesFormat'

export const ReproduciendoAhora = ({ imagen, nombre, artistas, duracion }) => {
  return (
      <div className="flex items-center bg-gray-400 border border-gray-600 rounded p-4 mb-4 relative">
          <div className="flex items-center">
              <img src={imagen} alt={nombre} className="h-16 w-16 mr-4 object-cover" />
              <div>
                  <h2 className="text-lg font-semibold">{nombre}</h2>
                  <p className="text-gray-600">{artistas}</p>
                  <p className="text-gray-600">{millisecondsToMinutesAndSeconds(duracion)}</p>
              </div>
          </div>
      </div>
  )
}
