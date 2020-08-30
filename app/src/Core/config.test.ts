import { get } from 'lodash'

import { ElementDatasetConfig, QuerystringConfig } from './config'

describe('Core', () => {
  describe('config', () => {
    describe('ElementDatasetConfig', () => {
      it('turns element dataset into config', () => {
        document.body.innerHTML = `
          <div data-foo />
        `
        const element = document.querySelector('[data-foo]') as HTMLElement
        const config = ElementDatasetConfig(element, 'foo')
        expect(config).toStrictEqual({})
      })

      it('filters out unprefixed', () => {
        document.body.innerHTML = `
          <div
            data-foo
            data-bar_enabled="true"
          />
        `
        const element = document.querySelector('[data-foo]') as HTMLElement
        const config = ElementDatasetConfig(element, 'foo')
        expect(config).toStrictEqual({})
      })

      it('wont overwrite', () => {
        document.body.innerHTML = `
          <div
            data-foo
            data-foo_some="bar"
            data-foo_some_collection_0_name="bar"
            data-foo_some_collection_0_name="foo"
            data-foo_some_collection_1_name="foo"
          />
        `
        const element = document.querySelector('[data-foo]') as HTMLElement
        const config = ElementDatasetConfig(element, 'foo')
        expect(config).not.toHaveProperty('some', 'bar')
        expect(config).toHaveProperty('some.collection')
        expect(get(config, 'some.collection')).toHaveLength(2)
        expect(get(config, 'some.collection.0.name')).toBe('bar')
      })
    })

    describe('QuerystringConfig', () => {
      it('composes', () => {
        const querystring = '?foo_bar=true&baz_foo=1'
        const config = QuerystringConfig(querystring)
        expect(config).toHaveProperty('foo.bar', true)
        expect(config).toHaveProperty('baz.foo', 1)
      })

      it('filters prefixed', () => {
        const querystring = '?foo_bar=true&baz_foo=1'
        const config = QuerystringConfig(querystring, 'foo')
        expect(config).toHaveProperty('bar', true)
        expect(config).not.toHaveProperty('foo')
      })
    })
  })
})
