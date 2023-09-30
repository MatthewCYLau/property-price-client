import { ReactElement, useState, useContext, ChangeEvent } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Store } from '../../store'
import { Token } from '../../types'
import CtaButton from '../../components/cta-button'
import { ActionType as AuthActionType } from '../../store/auth/action-types'
import { useNavigate } from 'react-router-dom'

interface Values {
  email: string
  password: string
}

const LoginPage = (): ReactElement => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    email: '',
    password: ''
  })
  const { state, dispatch } = useContext(Store)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const { data }: AxiosResponse<Token> = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
        formValues,
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      console.log('login success')
      dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data })
    } catch (err: any) {
      console.log(err)
    }
  }

  if (state.isAuthenticated) {
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="house-login"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                value={formValues.email}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
                value={formValues.password}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
            <CtaButton copy="Login" />
          </form>
          <p className="mt-8">
            Need an account?{' '}
            <button
              onClick={() => navigate('/sign-up')}
              className="text-blue-500 hover:text-blue-700"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
