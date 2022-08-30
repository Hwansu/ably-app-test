export const padTo2Digits = (num: number) => num.toString().padStart(2, '0')
export const convertMStoMMSS = (ms: number) => {
  // return new Date(time).toISOString().slice(14, 19)
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}
type regType = 'email'
const regTypes: {
  [k in regType]: RegExp
} = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
}
export const doRegExp = (text: string, type: regType): boolean => regTypes[type].test(text || '')
