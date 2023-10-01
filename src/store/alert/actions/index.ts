import { ActionType } from '../action-types'

interface SetAlertAction {
  type: ActionType.SET_ALERT
  payload: {
    id: string
    message: string
    severity: 'error' | 'info'
  }
}

interface RemoveAlertAction {
  type: ActionType.REMOVE_ALERT
  payload: string
}

export type Actions = SetAlertAction | RemoveAlertAction
