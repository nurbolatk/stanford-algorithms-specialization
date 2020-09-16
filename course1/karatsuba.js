const aloha = '3141592653589793238462643383279502884197169399375105820974944592'
const bamse = '2718281828459045235360287471352662497757247093699959574966967627'

function addStrings(a, b) {
  let min = a.length > b.length ? b : a
  let max = min === a ? b : a
  let res = []

  let carry = 0
  for (let i = 0; i < max.length; i++) {
    const minIndex = min.length - 1 - i
    const maxIndex = max.length - 1 - i
    if (minIndex >= 0) {
      const sum = parseInt(min[minIndex]) + parseInt(max[maxIndex]) + carry
      res.push(sum % 10)
      carry = Math.floor(sum / 10)
    } else {
      const sum = parseInt(max[maxIndex]) + carry
      res.push(sum % 10)
      carry = Math.floor(sum / 10)
    }
  }
  if (carry !== 0) res.push(carry)
  res.reverse()
  return res.join('')
}

function shiftToLeft(str, by) {
  let padding = []
  for (let i = 0; i < by; i++) {
    padding.push('0')
  }
  return `${str}${padding.join('')}`
}

// a - b, a >= b
function subtractStrings(a, b) {
  let res = []
  let carry = 0

  for (let i = 0; i < a.length; i++) {
    const maxIndex = a.length - 1 - i
    const minIndex = b.length - 1 - i
    const firstOperand = a[maxIndex]
    const secondOperand = b[minIndex] || 0
    let sub = firstOperand - carry - secondOperand
    if (sub < 0) {
      carry = 1
      sub += 10
    } else {
      carry = 0
    }
    res.push(sub)
  }
  let i = res.length - 1

  while (res[i] === 0) {
    res.pop()
    i--
  }
  res.reverse()
  return res.length ? res.join('') : '0'
}

function karatsuba(x, y) {
  if (x.length === 1 || y.length === 1) {
    return (parseFloat(x) * parseFloat(y)).toString()
  }

  const n = Math.min(x.length, y.length)
  const m = Math.floor(n / 2)

  const a = x.substring(0, x.length - m)
  const b = x.substring(x.length - m)

  const c = y.substring(0, y.length - m)
  const d = y.substring(y.length - m)

  const bd = karatsuba(b, d)
  const abcd = karatsuba(addStrings(a, b), addStrings(c, d))
  const ac = karatsuba(a, c)

  return addStrings(
    addStrings(
      shiftToLeft(ac, 2 * m),
      shiftToLeft(subtractStrings(subtractStrings(abcd, ac), bd), m)
    ),
    bd
  )
}

// const res = karatsuba('5678', '1234')
const res = karatsuba(aloha, bamse)
console.log('res', res)
