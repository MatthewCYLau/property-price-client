import React from 'react'
import { Actions as AuthActions } from './auth/actions'
import { ActionType as AuthActionType } from './auth/action-types'
import { Actions as AlertActions } from './alert/actions'
import { ActionType as AlertActionType } from './alert/action-types'
import { User, Alert } from '../types'

export type AppState = {
  token: string | null
  isAuthenticated: boolean
  alerts: Alert[]
  user:
    | User
    | {
        _id: ''
        email: ''
        name: ''
        avatarImageUrl: ''
      }
}

const initialState: AppState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  alerts: [],
  user: {
    _id: '',
    email: '',
    name: '',
    avatarImageUrl: ''
  }
}

type Action = AuthActions | AlertActions

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
          _id: '',
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
