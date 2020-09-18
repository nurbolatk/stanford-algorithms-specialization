function sort(arr, start = 0, end = arr.length) {
  if (end - start <= 1) return [arr[start]]

  const m = Math.floor((start + end) / 2)
  const leftSorted = sort(arr, start, m)
  const rightSorted = sort(arr, m, end)
  return merge(leftSorted, rightSorted)
}

function merge(left, right) {
  const res = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }

  while (left[i] !== undefined) {
    res.push(left[i])
    i++
  }
  while (right[j] !== undefined) {
    res.push(right[j])
    j++
  }
  return res
}

// const sorted = sort([1, 3, 5, 2, 4, 6])
const sorted = sort([1, 7, 3, 5, 2, 4, 6, 9, 8])
console.log('sorted', sorted)
