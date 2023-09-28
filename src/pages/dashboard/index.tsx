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
                  <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Gordon Road
                        </div>
                        <div className="text-sm text-gray-500">London</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">£100,000</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">+10%</div>
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        Above asking
                      </span>
                    </td>
                  </tr>
                  <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Bankside
                        </div>
                        <div className="text-sm text-gray-500">London</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">£500,000</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">-10%</div>
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                        Below asking
                      </span>
                    </td>
                  </tr>
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
