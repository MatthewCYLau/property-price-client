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
    </Layout>
  )
}

export default PropertyPage
