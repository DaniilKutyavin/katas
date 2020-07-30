export function dummy() {
  return () => 'dummy'
}

export function factorial() {
  let [acc, factor] = [1, 0]

  return () => {
    const result = acc

    factor = factor + 1
    acc = acc * factor

    return result
  }
}

export function fibonacci() {
  let [prev, curr] = [0, 1]

  return () => {
    const result = curr
    ;[prev, curr] = [curr, prev + curr]

    return result
  }
}

export function range(start: number, step: number) {
  let next = start

  return () => {
    const result = next

    next = next + step

    return result
  }
}

export function prime() {
  let primes = []
  let cur = 2

  const getNextPrime = () => {
    while (true) {
      if (primes.length === 0) return cur
      if (primes.every((n) => cur % n !== 0)) return cur
      cur = cur + 1
    }
  }

  return () => {
    const nextPrime = getNextPrime()

    primes.push(nextPrime)
    return nextPrime
  }
}

export function partialSum(...nums: number[]) {
  let index = 0
  let sum = 0

  return () => {
    if (index >= nums.length) throw new Error('Nothing to add')

    sum = sum + nums[index]
    index++

    return sum
  }
}
