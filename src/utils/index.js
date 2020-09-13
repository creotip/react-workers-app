export function rangeBetween(start, end) {
  if (Number.isInteger(start) && Number.isInteger(start)) {
    const rangeResult = Math.random() * (end - start) + start
    return parseInt(rangeResult)
  }
}

export async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function arrayFromNumber(num) {
  if (Number.isInteger(num)) {
    return Array.from(Array(num).keys())
  }
}

export function percentageOfNumber(totalValue, percentageValue) {
  return (100 * percentageValue) / totalValue
}
