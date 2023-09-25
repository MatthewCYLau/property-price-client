import {
  ReactChildren,
  ReactElement,
  ReactNode,
  useContext,
  useEffect
} from 'react'
import { AxiosResponse } from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import { User } from '../../types'
import { ActionType as AuthActionType } from '../../store/auth/action-types'
import api from '../../utils/api'

import { Store } from '../../store'

interface AuthWrapperProps {
  children: ReactChildren | ReactNode | ReactElement
}

const AuthWrapper = ({ children }: AuthWrapperProps): ReactElement => {
  const { dispatch, ...rest } = useContext(Store)

  const loadUser = async () => {
    try {
      const { data }: AxiosResponse<User> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth`
      )
      dispatch({
        type: AuthActionType.USER_LOADED,
        payload: data
      })
    } catch (err) {
      console.log('error!')
    }
  }

  const token = rest.state.token

  setAuthToken(token)

  useEffect(() => {
    loadUser()
  }, [token])

  return <>{children}</>
}

export default AuthWrapper
