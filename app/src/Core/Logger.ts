import debug from 'debug'

export function Logger (namespace: string) {
    return debug(['Game', namespace].join('/'))
}