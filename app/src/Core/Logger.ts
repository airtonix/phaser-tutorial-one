import { beforeMethod, afterMethod, afterInstance, Metadata } from 'kaop-ts'
import debug from 'debug'

import { APP_ID } from '~/Config/constants'

export type ConsoleLogType = typeof console.log

export function Logger (namespace: string): ConsoleLogType {
  return debug([APP_ID, namespace].join('.'))
}

export const LogMethodAction = (
  meta: Metadata<any>
): void => {
  if (!meta.scope.log) return
  const { method, args, result } = meta
  meta.scope.log(method.name, args, result)
}

export const LogMethodProperty = (property: string): ConsoleLogType =>
  (
    meta: Metadata<any>
  ) => {
    if (!meta.scope.log) return
    const { method, args, result, scope } = meta
    meta.scope.log(method.name, property, scope)
  }

export const Logs = afterInstance(meta => {
  const { method } = meta
  meta.scope.log = Logger(method.name)
})

export const LogsAll = afterInstance(meta => {
  const target = meta.scope
  const prototype = target.prototype
  const wove = afterMethod(LogMethodAction)
  for (const key in prototype) {
    Object.defineProperty(
      prototype,
      key,
      wove(
        target,
        key,
        Object.getOwnPropertyDescriptor(prototype, key)
      )
    )
  }
})


export const logsAfter =
  afterMethod(LogMethodAction)

export const logsBefore =
  beforeMethod(LogMethodAction)

export const logsPropertyAfter =
  (property: string): CallableFunction =>
    afterMethod(LogMethodProperty(property))

export const logsPropertyBefore =
  (property: string): CallableFunction =>
    beforeMethod(LogMethodProperty(property))