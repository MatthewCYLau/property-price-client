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
}

export interface PriceSuggestion {
  id: string
  differenceInPercentage: number
  property: Property
}

export interface PriceAnalysis {
  suggestedPrice: number
  percentageDifferenceFromAskingPrice: number
}
