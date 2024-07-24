import React from 'react'
import { Actions as AuthActions } from './auth/actions'
import { ActionType as AuthActionType } from './auth/action-types'
import { Actions as AlertActions } from './alert/actions'
import { ActionType as AlertActionType } from './alert/action-types'
import { Actions as NotificationActions } from './notification/actions'
import { ActionType as NotificationActionType } from './notification/action-types'
import { User, Alert, ModalActionType, Notification } from '../types'

export type AppState = {
  token: string | null
  isAuthenticated: boolean
  alerts: Alert[]
  notifications: Notification[]
  modal: {
    showModal: boolean
    message: string
    onConfirm?: () => void
    onCancel?: () => void
    onCopyClick?: () => void
  }
  user:
    | User
    | {
        id: ''
        email: ''
        name: ''
        avatarImageUrl: ''
      }
}

const initialState: AppState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  alerts: [],
  notifications: [],
  modal: {
    showModal: false,
    message: ''
  },
  user: {
    id: '',
    email: '',
    name: '',
    avatarImageUrl: ''
  }
}

type Action =
  | {
      type: ModalActionType.SET_MODAL
      payload: {
        message: string
        onConfirm: () => void
        onCancel?: () => void
        onCopyClick?: () => void
      }
    }
  | {
      type: ModalActionType.REMOVE_MODAL
    }
  | AuthActions
  | AlertActions
  | NotificationActions

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case AuthActionType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case AuthActionType.LOGIN_SUCCESS:
    case AuthActionType.REGISTRATION_SUCCESS:
      return { ...state, token: action.payload.token, isAuthenticated: true }
    case AuthActionType.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: {
          id: '',
          email: '',
          name: '',
          avatarImageUrl: ''
        }
      }
    case AlertActionType.SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    case AlertActionType.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload)
      }
    case ModalActionType.SET_MODAL:
      return {
        ...state,
        modal: {
          showModal: true,
          message: action.payload.message,
          onCancel: action.payload.onCancel,
          onConfirm: action.payload.onConfirm,
          onCopyClick: action.payload.onCopyClick
        }
      }
    case ModalActionType.REMOVE_MODAL:
      return {
        ...state,
        modal: {
          showModal: false,
          message: ''
        }
      }
    case NotificationActionType.LOAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      }

    case NotificationActionType.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        )
      }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
