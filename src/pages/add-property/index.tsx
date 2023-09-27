import { ReactElement, useState, ChangeEvent } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout'
interface Values {
  listingUrl: string
  askingPrice: number
  address: string
}

const AddPropertyPage = (): ReactElement => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    listingUrl: '',
    askingPrice: 0,
    address: ''
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
        {
          listingUrl: formValues.listingUrl,
          index: +formValues.askingPrice,
          note: formValues.address
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Email"
              className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="
                        w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AddPropertyPage
