import 'chart.js/auto'
import { ReactElement, useState, useEffect } from 'react'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import { Doughnut } from 'react-chartjs-2'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import {
  PriceSuggestionsStatistics,
  notificationCopyMap,
  NotificationType
} from '../../types'

const getDoughnutData = (stats: PriceSuggestionsStatistics) => ({
  labels: [
    notificationCopyMap[NotificationType.ABOVE_ASKING],
    notificationCopyMap[NotificationType.ASKING],
    notificationCopyMap[NotificationType.BELOW_ASKING]
  ],
  datasets: [
    {
      label: 'count',
      data: [stats.aboveAsking, stats.asking, stats.belowAsking],
      backgroundColor: [
        'rgb(99 102 241)',
        'rgb(248 113 113)',
        'rgb(251 191 36)'
      ],
      hoverOffset: 4
    }
  ]
})

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
          <div className="w-full flex flex-col items-center">
            <h3 className="mt-6 text-xl">Price Suggestions Statistics</h3>
            <Doughnut data={getDoughnutData(statistics)} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StatisticsPage
