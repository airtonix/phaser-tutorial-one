import debug from 'debug'

export class WritesLogs {
    logger: Function

    constructor () {
        this.logger = debug(this.key || 'Game')
    }

    log (...messages) {
        this.logger(...messages)
    }
}