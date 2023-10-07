import { ReactElement, useState } from 'react'
import Layout from '../../components/layout'
import CtaButton from '../../components/cta-button'

const UpdateUserPage = (): ReactElement => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log('submit')
          }}
        >
          <div className="mb-6">
            <label className="block text-gray-700">Update position</label>
          </div>
          <div className="relative group">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="inline-flex justify-center w-full px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">Select position</span>
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
                <button className="w-full block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                  Renter
                </button>
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
