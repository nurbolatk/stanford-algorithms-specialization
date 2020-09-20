function countInv(arr, inv = []) {
  if (arr.length < 2) return arr

  const mid = Math.floor(arr.length / 2)
  const sortedLeft = countInv(arr.slice(0, mid), inv)
  const sortedRight = countInv(arr.slice(mid), inv)
  const merged = countInvAndSort(sortedLeft, sortedRight, inv)

  return merged
}

function countInvAndSort(left, right, inversions) {
  const sorted = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted.push(left[i])
      i++
    } else if (left[i] > right[j]) {
      // inversion detected!
      for (let k = i; k < left.length; k++) {
        inversions.push([left[k], right[j]])
      }
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

  return sorted
}

const inv = []
const example = [1, 3, 5, 2, 4, 6]
const num = countInv(example, inv)
console.log(inv)

const rightAnswer = 3
console.assert(
  inv.length === rightAnswer,
  `The result is ${inv.length} instead of ${rightAnswer}`
)

function divisionTester(arr) {
  if (arr.length === 1) return console.log(arr)
  const mid = Math.floor(arr.length / 2)
  divisionTester(arr.slice(0, mid))
  divisionTester(arr.slice(mid))
}

// divisionTester(example)
