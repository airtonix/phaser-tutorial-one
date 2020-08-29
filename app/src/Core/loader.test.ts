import { getPathFromLocation } from './loader'

describe('Core', () => {
  describe('loader', () => {

    it('directory from directory', () => {
      const sample = '/something/foo'
      const expected = '/something/foo'
      const output = getPathFromLocation(sample)
      expect(output).toBe(expected)
    })

    it('directory from filename', () => {
      const sample = '/something/foo/file.html'
      const expected = '/something/foo'
      const output = getPathFromLocation(sample)
      expect(output).toBe(expected)
    })

    it('directory from relative directory', () => {
      const sample = './something/'
      const expected = './something'
      const output = getPathFromLocation(sample)
      expect(output).toBe(expected)
    })

  })
})
