import { parse } from 'path'

import flatten, { unflatten } from 'flat'
import { merge, memoize } from 'lodash'

export type IConfigItem =
  string |
  number |
  boolean |
  IConfig |
  Array<string | number | boolean | IConfig>

export interface IConfig {
  [key: string]: IConfigItem
}
export interface HTMLDataset {
  [key: string]: string | undefined
}
export type IUnProcessedConfig = IConfig | HTMLDataset

export function ElementDatasetConfig (
  element: HTMLElement,
  prefix: string,
  defaultConfig: IConfig = {}
): IConfig {
  if(!element) return {}
  if(!prefix) return {}
  const dataset = { ...element.dataset }
  const proposed = PrefixedConfigParser(prefix, dataset)
  const config = ConfigParser(
    proposed,
    defaultConfig
  )
  return config
}

export function ComputeQuerystring (
  querystring: string = window.location.search
): IConfig {
  const parse = (value: string) => {
    try {
      return JSON.parse(value)
    } catch { }
    return value
  }
  const dataset = querystring
    .replace(/^\??/, '')
    .split('&')
    .reduce((result, item) => {
      if (item.includes('=')) {
        const [key, value] = item.split('=')
        return {
          ...result,
          [key]: parse(value)
        }
      } else {
        return {
          ...result,
          [item]: true
        }
      }
    }, {})
  return dataset
}

export const ComputedMemoizedQuerystring = memoize(ComputeQuerystring)

export function QuerystringConfig (
  querystring: string,
  prefix?: string,
  defaultConfig: IConfig = {}
): IConfig {
  if(!querystring) return {}
  const dataset = ComputedMemoizedQuerystring(querystring)
  const data = prefix
    ? PrefixedConfigParser(prefix, dataset)
    : dataset
  const config = ConfigParser(
    data,
    defaultConfig
  )
  return config
}

export function PrefixedConfigParser (
  prefix: string,
  dataset: IUnProcessedConfig
): IConfig {
  const prefixReplacePattern = new RegExp(`^${prefix}_?`)
  return Object.keys(dataset)
    .filter(key => key.startsWith(prefix) && key !== prefix)
    .reduce((result, key) => {
      const newKey = key.replace(prefixReplacePattern, '')
      return {
        ...result,
        [newKey]: dataset[key]
      }
    }, {})

}

export function ConfigParser (
  config: any,
  defaultConfig: IConfig = {}
): IConfig {
  const processed = unflatten(config, {
    delimiter: '_',
    overwrite: true
  })
  const output = merge({}, defaultConfig, processed)
  return output
}
