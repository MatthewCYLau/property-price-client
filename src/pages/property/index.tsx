import { ReactElement, useState, useEffect } from 'react'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { Property } from '../../types'
import PropertyCard from '../../components/property-card'

const PropertyPage = (): ReactElement => {
  const { id } = useParams()
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
              id={property.id}
              address={property.address}
              price={property.askingPrice}
              created={new Date(Date.parse(property.created)).toDateString()}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-10">
          <label className="w-full text-gray-700 text-sm font-semibold">
            Counter Input
          </label>
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-l cursor-pointer outline-none">
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-1/2 bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700  outline-none"
              value="0"
            ></input>
            <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-r cursor-pointer">
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PropertyPage
