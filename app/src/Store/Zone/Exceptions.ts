import { Zone } from './ZoneModel'

export class UnknownZone extends Error {
    name = 'UnknownZone'
    constructor (zone: Zone) {
      super('UnknownZone' + zone.$modelId)
      Error.captureStackTrace(this)
    }
}
export class NoZoneMapError extends Error {
    name = 'NoZoneMapError'
}

interface ZoneNotFoundErrorProps {
    [key: string]: any
}

export class ZoneNotFoundError extends Error {
    name = 'ZoneNotFoundError'
    constructor (props: ZoneNotFoundErrorProps) {
      super('UnknownZone')
      this.message = props
        ? Object.keys(props)
            .map(key => `${key} = ${props[key]}`)
            .join(' ')
        : ''
      Error.captureStackTrace(this)
    }
}
