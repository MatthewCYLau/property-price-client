import { ReactElement, useState, useEffect } from 'react'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import Layout from '../../components/layout'
import { Property } from '../../types'
import PropertyCard from '../../components/property-card'

const DashboardPage = (): ReactElement => {
  const [properties, setProperties] = useState<Property[]>([])

  const getProperties = async () => {
    try {
      const { data }: AxiosResponse<Property[]> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`
      )
      setProperties(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProperties()
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {!!properties.length ? (
          <>
            {properties.map((n) => (
              <PropertyCard
                id={n.id}
                address={n.address}
                price={n.askingPrice}
                created={new Date(Date.parse(n.created)).toDateString()}
              />
            ))}
          </>
        ) : (
          <h1>No Property</h1>
        )}
      </div>
    </Layout>
  )
}

export default DashboardPage
