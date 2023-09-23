import React from 'react'
import { Actions as AuthActions } from './auth/actions'
import { ActionType as AuthActionType } from './auth/action-types'
import { User } from '../types'

export type AppState = {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
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
  loading: true,
  user: {
    _id: '',
    email: '',
    name: '',
    avatarImageUrl: ''
  }
}

type Action = AuthActions

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case AuthActionType.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
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
        loading: false,
        user: {
          _id: '',
          email: '',
          name: '',
          avatarImageUrl: ''
        }
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
