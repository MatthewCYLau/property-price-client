import { ReactElement, useState, ChangeEvent } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import CtaButton from '../../components/cta-button'
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
          askingPrice: +formValues.askingPrice,
          address: formValues.address
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
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">Property listing URL</label>
            <input
              type="text"
              placeholder="https://www.rightmove.co.uk/properties/137704190"
              name="listingUrl"
              id="listingUrl"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={formValues.listingUrl}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Asking price</label>
            <input
              type="text"
              placeholder="Asking price"
              name="askingPrice"
              id="askingPrice"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={formValues.askingPrice}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Montpelier Road, Sutton, London"
              name="address"
              id="address"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              value={formValues.address}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <CtaButton copy="Add Property" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AddPropertyPage
