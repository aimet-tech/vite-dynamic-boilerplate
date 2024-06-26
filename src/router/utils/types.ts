/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react'
import { RouteObject } from 'react-router-dom'

export type LazyRouteObject = Omit<
  RouteObject,
  'lazy' | 'element' | 'Component' | 'children'
> & {
  Component: () => Promise<{ default: ComponentType<any> }>
  children?: LazyRouteObject[]
  preloads?: (() => Promise<any>)[]
}
