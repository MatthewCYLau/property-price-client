export interface Token {
  token: string
}
export interface User {
  id: string
  email: string
  name: string
}

export interface Property {
  id: string
  created: string
  listingUrl: string
  askingPrice: number
  address: string
  userId: string
}

export interface PriceSuggestion {
  id: string
  differenceInPercentage: number
  note: string
  property: Property
  userId: string
}

export interface PriceAnalysis {
  suggestedPrice: number
  percentageDifferenceFromAskingPrice: number
}

export interface Alert {
  id: string
  message: string
  severity: 'error' | 'info'
}

export enum ModalActionType {
  SET_MODAL = 'set_modal',
  REMOVE_MODAL = 'remove_modal'
}
