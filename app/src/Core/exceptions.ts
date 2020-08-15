export class NotImplementedError extends Error {
  constructor (message = 'You need to implement this method or class') {
    super()
    this.message = `NotImplemented: ${message}`
  }
}
