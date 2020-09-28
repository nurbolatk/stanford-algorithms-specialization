const fs = require('fs')

function countInv(arr) {
  if (arr.length < 2) return [arr, 0]

  const mid = Math.floor(arr.length / 2)
  const [sortedLeft, leftInv] = countInv(arr.slice(0, mid))
  const [sortedRight, rightInv] = countInv(arr.slice(mid))
  const [merged, splitInv] = countInvAndSort(sortedLeft, sortedRight)

  return [merged, leftInv + rightInv + splitInv]
}

function countInvAndSort(left, right) {
  let invs = 0
  const sorted = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted.push(left[i])
      i++
    } else if (left[i] > right[j]) {
      // inversion detected!
      invs += left.length - i
      sorted.push(right[j])
      j++
    } else {
      sorted.push(right[j])
      j++
    }
  }
  while (i < left.length) {
    sorted.push(left[i])
    i++
  }
  while (j < right.length) {
    sorted.push(right[j])
    j++
  }

  return [sorted, invs]
}

try {
  const data = fs.readFileSync('./input2.txt', 'utf8')
  let input2 = data.split('\r\n')
  input2.pop()
  input2 = input2.map(num => parseInt(num))
  const [_, num] = countInv(input2)
  console.log(num)
} catch (error) {
  console.error('Error when trying to open the input2.txt file', error)
}

const input1 = [
  4,
  80,
  70,
  23,
  9,
  60,
  68,
  27,
  66,
  78,
  12,
  40,
  52,
  53,
  44,
  8,
  49,
  28,
  18,
  46,
  21,
  39,
  51,
  7,
  87,
  99,
  69,
  62,
  84,
  6,
  79,
  67,
  14,
  98,
  83,
  0,
  96,
  5,
  82,
  10,
  26,
  48,
  3,
  2,
  15,
  92,
  11,
  55,
  63,
  97,
  43,
  45,
  81,
  42,
  95,
  20,
  25,
  74,
  24,
  72,
  91,
  35,
  86,
  19,
  75,
  58,
  71,
  47,
  76,
  59,
  64,
  93,
  17,
  50,
  56,
  94,
  90,
  89,
  32,
  37,
  34,
  65,
  1,
  73,
  41,
  36,
  57,
  77,
  30,
  22,
  13,
  29,
  38,
  16,
  88,
  61,
  31,
  85,
  33,
  54,
]
const [_, num] = countInv(input1)
console.log(num)
