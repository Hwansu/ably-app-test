export const padTo2Digits = (num: number) => num.toString().padStart(2, '0')
export const convertMStoMMSS = (ms: number) => {
  // return new Date(time).toISOString().slice(14, 19)
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}
