import { ReactElement, useState, useContext, ChangeEvent } from 'react'
import api from '../../utils/api'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store'
import Layout from '../../components/layout'
import { UserType } from '../../types'
import CtaButton from '../../components/cta-button'
import { ActionType as AlertActionType } from '../../store/alert/action-types'

interface Values {
  email: string
  password: string
  userType: UserType
}

type UserTypeMap = {
  [name in UserType]: string
}

const userTypeButtonCopies: UserTypeMap = {
  FirstTimeBuyer: 'First time buyer',
  HomeOwner: 'Home owner',
  Landlord: 'Landlord',
  Renter: 'Renter'
}

const userTypes: readonly UserType[] = [
  UserType.FIRST_TIME_BUYER,
  UserType.HOME_OWNER,
  UserType.LANDLORD,
  UserType.RENTER
]

const UpdateUserPage = (): ReactElement => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const { dispatch, state } = useContext(Store)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    email: '',
    password: '',
    userType: UserType.RENTER
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const dropdownItemOnClickHandler = (n: UserType) => {
    setFormValues((prevState) => ({
      ...prevState,
      userType: n
    }))
    setShowDropdown(!showDropdown)
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${state.user.id}`,
        {
          ...formValues,
          email: state.user.email
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      navigate('/dashboard')
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              value={formValues.password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">User type</label>
          </div>
          <div className="relative group">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              type="button"
              className="inline-flex justify-center w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">
                {userTypeButtonCopies[formValues.userType]}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {showDropdown && (
              <div
                id="dropdown-menu"
                className="absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
              >
                <input
                  id="search-input"
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                  type="text"
                  placeholder="Search items"
                />
                {userTypes.map((n) => (
                  <button
                    key={n}
                    onClick={() => dropdownItemOnClickHandler(n)}
                    className="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  >
                    {userTypeButtonCopies[n]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mb-6">
            <CtaButton copy="Update User" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default UpdateUserPage
