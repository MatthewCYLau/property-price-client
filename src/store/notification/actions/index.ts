import { ActionType } from '../action-types'
import { Notification } from '../../../types'

interface LoadNotificationsSuccessAction {
  type: ActionType.LOAD_NOTIFICATIONS_SUCCESS
  payload: Notification[]
}

interface RemoveNotificationAction {
  type: ActionType.REMOVE_NOTIFICATION
  payload: string
}

export type Actions = LoadNotificationsSuccessAction | RemoveNotificationAction
