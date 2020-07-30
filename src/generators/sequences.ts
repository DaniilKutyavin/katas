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
