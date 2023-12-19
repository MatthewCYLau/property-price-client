import { ReactElement, useState, useEffect } from 'react'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { PriceSuggestionsStatistics } from '../../types'

const StatisticsPage = (): ReactElement => {
  const [statistics, setStatistics] = useState<PriceSuggestionsStatistics>({
    aboveAsking: 0,
    asking: 0,
    belowAsking: 0
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getPriceSuggestionsStatistics = async () => {
    try {
      const { data }: AxiosResponse<PriceSuggestionsStatistics> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/statistics/price-suggestions`
      )
      setStatistics(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPriceSuggestionsStatistics()
  }, [])
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p>{statistics.aboveAsking}</p>
            <p>{statistics.asking}</p>
            <p>{statistics.belowAsking}</p>
          </>
        )}
      </div>
    </Layout>
  )
}

export default StatisticsPage
