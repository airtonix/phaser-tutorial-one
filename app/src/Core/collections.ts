export function range (start: integer, end: integer) {
    return Array.from(Array(end - start))
        .reduce((result, item) => {
            return result.concat(
                result[result.length-1] + 1
            )
        }, [start])
}