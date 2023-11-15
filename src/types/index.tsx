export interface Token {
  token: string
}
export interface User {
  id: string
  email: string
  name: string
}

export interface PaginationMeta {
  totalRecords: number
  currentPage: number
  totalPages: number
}

export interface Property {
  id: string
  created: string
  listingUrl: string
  askingPrice: number
  address: string
  userId: string
  avatarId: number
}

export interface PriceSuggestion {
  id: string
  differenceInPercentage: number
  note: string
  property: Property
  userId: string
}

export interface PriceSuggestionsResponse {
  paginationMetadata: PaginationMeta
  priceSuggestions: PriceSuggestion[]
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

export interface Notification {
  id: string
  readStatus: boolean
  priceSuggestionId: string
  actorId: string
  notifierId: string
  notificationType: NotificationType
}

export enum UserType {
  RENTER = 'Renter',
  FIRST_TIME_BUYER = 'FirstTimeBuyer',
  HOME_OWNER = 'HomeOwner',
  LANDLORD = 'Landlord'
}

export enum NotificationType {
  ABOVE_ASKING = 'AboveAsking',
  BELOW_ASKING = 'BelowAsking',
  ASKING = 'Asking'
}

type NotificationCopyMap<T> = { [notification in NotificationType]: T }

export const notificationCopyMap: NotificationCopyMap<string> = {
  AboveAsking: 'above asking',
  BelowAsking: ' below asking',
  Asking: 'asking'
}
