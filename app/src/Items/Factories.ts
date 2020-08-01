import dream from 'dreamjs'

export function Factory (name, schema) {
    return dream
        .schema(name, schema)
}

export function Generate (name, count = 1) {
    return dream.useSchema(name)
        .generateRnd(count)
        .output()
}
