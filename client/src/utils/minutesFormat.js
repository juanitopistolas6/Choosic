export function millisecondsToMinutesAndSeconds(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  // Opcional: formatear los segundos para que siempre tengan dos dígitos
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
  return `${minutes}:${formattedSeconds}`;
}