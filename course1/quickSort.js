const fs = require('fs')

let count = 0

function sort(arr, l = 0, r = arr.length) {
  if (r - l <= 1) return
  const p = choosePivot(arr, l, r)
  const m = partition(arr, p, l, r)
  sort(arr, l, m)
  sort(arr, m + 1, r)
}

function choosePivot(arr, l, r) {
  const m = Math.floor((r - l - 1) / 2) + l
  if (arr[l] < arr[m]) {
    if (arr[m] < arr[r - 1]) {
      return m
    } else {
      if (arr[l] < arr[r - 1]) {
        return r - 1
      } else {
        return l
      }
    }
  } else {
    if (arr[r - 1] > arr[l]) {
      return l
    } else {
      if (arr[m] > arr[r - 1]) {
        return m
      } else {
        return r - 1
      }
    }
  }
}

function partition(arr, pivot, l, r) {
  let p = pivot
  if (pivot !== l) {
    swap(arr, pivot, l)
    p = l
  }

  let i = p + 1
  for (let j = p + 1; j < r; j++) {
    if (arr[j] < arr[p]) {
      swap(arr, i, j)
      i += 1
    }
  }

  count += (r - l - 1)

  swap(arr, p, i - 1)
  return i - 1
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const example = [
  3, 8, 2, 5, 1, 4, 7, 6
]

sort(example)
console.log(example)
console.log(count)

try {
  const data = fs.readFileSync('./input3.txt', 'utf8')
  let input2 = data.split('\r\n')
  input2.pop()
  input2 = input2.map(num => parseInt(num))
  sort(input2)
  console.log(count)
} catch (error) {
  console.error('Error when trying to open the input3.txt file', error)
}