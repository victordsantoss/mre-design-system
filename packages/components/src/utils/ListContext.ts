import * as React from 'react'
import type { ItemDensity } from '../Item'

export type ListOrientation = 'vertical' | 'horizontal'

export interface ListContextValue {
  density: ItemDensity
  orientation: ListOrientation
}

export const ListContext = React.createContext<ListContextValue | null>(null)
