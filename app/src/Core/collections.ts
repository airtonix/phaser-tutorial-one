export function range (start: number, end: number): number[] {
  return Array.from(Array(end - start))
    .reduce((result) => {
      return result.concat(
        result[result.length-1] + 1
      )
    }, [start])
}