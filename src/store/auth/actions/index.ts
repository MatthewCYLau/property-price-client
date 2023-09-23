import { ActionType } from '../action-types'
import { User, Token } from '../../../types'

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS
  payload: Token
}

interface UserLoadedAction {
  type: ActionType.USER_LOADED
  payload: User
}

interface UserAvatarImageUrlUpdatedAction {
  type: ActionType.USER_AVATAR_IMAGE_URL_UPDATED
  payload: string
}

interface RegistrationSuccessAction {
  type: ActionType.REGISTRATION_SUCCESS
  payload: Token
}

interface LogoutAction {
  type: ActionType.LOGOUT
}
export type Actions =
  | UserLoadedAction
  | UserAvatarImageUrlUpdatedAction
  | RegistrationSuccessAction
  | LoginSuccessAction
  | LogoutAction
