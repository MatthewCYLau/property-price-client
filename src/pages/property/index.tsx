import { ReactElement, useState, useEffect, ChangeEvent } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { Property } from '../../types'
import PropertyCard from '../../components/property-card'

interface Values {
  differenceInPercentage: number
}

const PropertyPage = (): ReactElement => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    differenceInPercentage: 0
  })
  const [property, setProperty] = useState<Property>({
    id: '',
    created: '',
    listingUrl: '',
    askingPrice: 0,
    address: ''
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getPropertyById = async (id: string) => {
    setIsLoading(true)
    try {
      const { data }: AxiosResponse<Property> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${id}`
      )
      setProperty(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/price-suggestions`,
        {
          differenceInPercentage: +formValues.differenceInPercentage,
          propertyId: id
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

  const decrementHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFormValues((prevState) => ({
      ...prevState,
      differenceInPercentage: prevState.differenceInPercentage - 1
    }))
  }

  const incrementHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFormValues((prevState) => ({
      ...prevState,
      differenceInPercentage: prevState.differenceInPercentage + 1
    }))
  }

  useEffect(() => {
    id && getPropertyById(id)
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <PropertyCard
              listingUrl={property.listingUrl}
              address={property.address}
              price={property.askingPrice}
              created={new Date(Date.parse(property.created)).toDateString()}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <form className="h-10" onSubmit={submitHandler}>
          <label className="block text-gray-700">
            Offer price suggestion (% from asking)
          </label>
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              onClick={decrementHandler}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              name="differenceInPercentage"
              id="differenceInPercentage"
              className="outline-none focus:outline-none text-center w-1/2 bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700  outline-none"
              value={formValues.differenceInPercentage}
              onChange={(e) => onChange(e)}
            ></input>
            <button
              onClick={incrementHandler}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
          <button
            type="submit"
            className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white rounded-lg
              px-4 py-3 mt-6"
          >
            Submit suggestion
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default PropertyPage
