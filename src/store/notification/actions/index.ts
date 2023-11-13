import { ActionType } from '../action-types'
import { Notification } from '../../../types'

interface LoadNotificationsSuccessAction {
  type: ActionType.LOAD_NOTIFICATIONS_SUCCESS
  payload: Notification[]
}

export type Actions = LoadNotificationsSuccessAction
