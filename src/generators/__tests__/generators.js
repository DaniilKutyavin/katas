const { generator } = require('../')
const { dummy, factorial, fibonacci, range, prime, partialSum } = require('../sequences')

describe('Generators', () => {
  test('After calling generator with correct function, it returns the object with next method', () => {
    const voidGen = generator(() => () => {})

    expect(voidGen).toHaveProperty('next')
    expect(voidGen.next).toBeInstanceOf(Function)
  })

  test("dummy sequence - should return 'dummy' on every call", () => {
    const dummyGen = generator(dummy)

    for (let i = 0; i < 10; i++) {
      expect(dummyGen.next()).toBe('dummy')
    }
  })

  test('factorial sequence', () => {
    const factorialGen = generator(factorial)
    const results = [1, 1, 2, 6, 24]

    results.forEach((result) => {
      expect(factorialGen.next()).toBe(result)
    })
  })

  test('fibonacci sequence', () => {
    const fibbonaciGen = generator(fibonacci)
    const results = [1, 1, 2, 3, 5, 8, 13]

    results.forEach((result) => {
      expect(fibbonaciGen.next()).toBe(result)
    })
  })

  test('range sequence', () => {
    const rangeGen = generator(range, 0, 5)
    const results = [0, 5, 10, 15, 20, 25, 30, 35]

    results.forEach((result) => {
      expect(rangeGen.next()).toBe(result)
    })
  })

  test('prime sequence', () => {
    const primeGen = generator(prime)
    const results = [2, 3, 5, 7, 11, 13]

    results.forEach((result) => {
      expect(primeGen.next()).toBe(result)
    })
  })

  test('partial sum', () => {
    const nums = [2, 3, 4, 0, 10, 25, 15]
    const partialSumGen = generator(partialSum, ...nums)
    const results = [2, 5, 9, 9, 19, 44, 59]

    results.forEach((result) => {
      expect(partialSumGen.next()).toBe(result)
    })

    expect(partialSumGen.next).toThrow()
  })
})
