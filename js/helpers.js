const sumArray = (arr) => {
  let sum = 0
  arr.forEach((num) => {
    sum += num
  })
  // console.log(sum)
  return sum
}
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const randomNumEvens = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min

  if (num % 2 === 0) {
    return num
  } else {
    return randomNumEvens(min, max)
  }
}