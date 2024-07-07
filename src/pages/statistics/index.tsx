import 'chart.js/auto'
import { ReactElement, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import api from '../../utils/api'
import { convertDateToValidFormet } from '../../utils/date'
import { AxiosResponse } from 'axios'
import { Doughnut } from 'react-chartjs-2'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import CtaButton from '../../components/cta-button'
import {
  PriceSuggestionsStatistics,
  notificationCopyMap,
  NotificationType
} from '../../types'

import 'react-datepicker/dist/react-datepicker.css'

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
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

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

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api
        .post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/properties/export-csv?startDate=${convertDateToValidFormet(
            fromDate
          )}&endDate=${convertDateToValidFormet(toDate)}`,
          {
            responseType: 'blob'
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          const fileName = `${new Date().toLocaleDateString()}.csv`
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
    } catch (err) {
      console.log(err)
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
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">From date</label>
            <DatePicker
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              selected={fromDate}
              onChange={(date) => date && setFromDate(date)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">End Date</label>
            <DatePicker
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              selected={toDate}
              onChange={(date) => date && setToDate(date)}
            />
          </div>
          <div className="mb-6">
            <CtaButton copy="Export Properties CSV" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default StatisticsPage
