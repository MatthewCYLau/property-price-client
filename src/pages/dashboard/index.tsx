import { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { Property, PriceSuggestion } from '../../types'
import PropertyCard from '../../components/property-card'
import TableRow from '../../components/table-row'

const DashboardPage = (): ReactElement => {
  const [properties, setProperties] = useState<Property[]>([])
  const [priceSuggestions, setPriceSuggestions] = useState<PriceSuggestion[]>(
    []
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getProperties = async () => {
    try {
      const { data }: AxiosResponse<Property[]> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`
      )
      setProperties(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriceSuggestions = async () => {
    try {
      const { data }: AxiosResponse<PriceSuggestion[]> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/price-suggestions`
      )
      setPriceSuggestions(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProperties()
    getPriceSuggestions()
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!!properties.length &&
              properties.map((n) => (
                <Link to={`/properties/${n.id}`}>
                  <PropertyCard
                    key={n.id}
                    address={n.address}
                    price={n.askingPrice}
                    created={new Date(Date.parse(n.created)).toDateString()}
                  />
                </Link>
              ))}
          </>
        )}
      </div>
      <h3 className="mt-6 text-xl">Recent Price Suggestions</h3>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Asking price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Offer price suggestion
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!!priceSuggestions.length &&
                    priceSuggestions.map((n) => (
                      <TableRow
                        key={n.id}
                        id={n.id}
                        address={n.property.address}
                        askingPrice={n.property.askingPrice}
                        differenceInPercentage={n.differenceInPercentage}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage
