import {
  ReactElement,
  useState,
  useContext,
  ChangeEvent,
  useEffect
} from 'react'
import axios, { AxiosResponse } from 'axios'
import { v4 as uuid } from 'uuid'
import { Store } from '../../store'
import { Token } from '../../types'
import CtaButton from '../../components/cta-button'
import { ActionType as AuthActionType } from '../../store/auth/action-types'
import { ActionType as AlertActionType } from '../../store/alert/action-types'
import { Link, useNavigate } from 'react-router-dom'

interface Values {
  email: string
  password: string
  passwordConfirm: string
}

const SignUpPage = (): ReactElement => {
  const navigate = useNavigate()
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true)
  const [formValues, setFormValues] = useState<Values>({
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const { state, dispatch } = useContext(Store)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const { data }: AxiosResponse<Token> = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users`,
        {
          email: formValues.email,
          password: formValues.password,
          userType: 'Renter'
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      dispatch({ type: AuthActionType.REGISTRATION_SUCCESS, payload: data })
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  useEffect(
    () =>
      setDisableSubmit(
        !formValues.email || formValues.password !== formValues.passwordConfirm
      ),
    [formValues.email, formValues.passwordConfirm, formValues.password]
  )

  if (state.isAuthenticated) {
    navigate('/dashboard')
  }
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=20"
          alt="house-sign-up"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl leading-tight mt-12">
            Sign up now!
          </h1>

          <form className="mt-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                id="password-confirm"
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                onChange={(e) => onChange(e)}
              />
            </div>
            <CtaButton disableSubmit={disableSubmit} copy="Sign up" />
            <Link
              className="mt-8 text-blue-500 hover:text-blue-700 inline-block"
              to="/"
            >
              Return home
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
