import {
  ReactElement,
  useState,
  useContext,
  ChangeEvent,
  useEffect
} from 'react'
import { v4 as uuid } from 'uuid'
import { Store } from '../../store'
import api from '../../utils/api'
import { AxiosResponse } from 'axios'
import { ModalActionType, AnalysisJob } from '../../types'
import Layout from '../../components/layout'
import CtaButton from '../../components/cta-button'
import { ActionType as AlertActionType } from '../../store/alert/action-types'
import ProgressPill from '../../components/progress-pill'

interface CreateAnalysisJobValues {
  postcode: string
}

interface GetAnalysisJobValues {
  jobId: string
}

const AnalysisJobsPage = (): ReactElement => {
  const { dispatch } = useContext(Store)
  const [analysisJobs, setAnalysisJobs] = useState<AnalysisJob[]>([])
  const [createAnalysisJobformValues, setCreateAnalysisJobformValues] =
    useState<CreateAnalysisJobValues>({
      postcode: ''
    })
  const [getAnalysisJobformValues, setGetAnalysisJobformValues] =
    useState<GetAnalysisJobValues>({
      jobId: ''
    })

  const onCreateAnalysisJobFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateAnalysisJobformValues({
      ...createAnalysisJobformValues,
      [e.target.name]: e.target.value
    })
  }

  const onGetAnalysisJobFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGetAnalysisJobformValues({
      ...getAnalysisJobformValues,
      [e.target.name]: e.target.value
    })
  }

  const createAnalysisJobSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/jobs`,
        createAnalysisJobformValues,
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      const ingestJobId = res.data.ingestJobId
      dispatch({
        type: ModalActionType.SET_MODAL,
        payload: {
          message: `Analysis job created ${ingestJobId}`,
          onConfirm: () => {
            dispatch({ type: ModalActionType.REMOVE_MODAL })
            setCreateAnalysisJobformValues({ postcode: '' })
            getAnalysisJobs()
          }
        }
      })
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  const getAnalysisJobSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/jobs/${
          getAnalysisJobformValues.jobId
        }`
      )
      let message = ''
      if (res.data.complete) {
        message = `Suggest property price ${res.data.transactionPrice}`
      } else {
        message = 'Job is still in progress...'
      }
      dispatch({
        type: ModalActionType.SET_MODAL,
        payload: {
          message,
          onConfirm: () => {
            dispatch({ type: ModalActionType.REMOVE_MODAL })
            setGetAnalysisJobformValues({ jobId: '' })
          }
        }
      })
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  const getAnalysisJobs = async () => {
    try {
      const { data }: AxiosResponse<AnalysisJob[]> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/jobs`
      )
      setAnalysisJobs(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAnalysisJobs()
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={createAnalysisJobSubmitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">Postcode</label>
            <input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="Enter Postcode"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              value={createAnalysisJobformValues.postcode}
              onChange={(e) => onCreateAnalysisJobFormChange(e)}
            />
          </div>
          <div className="mb-6">
            <CtaButton copy="Create Analysis Job" />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={getAnalysisJobSubmitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">Job ID</label>
            <input
              type="text"
              name="jobId"
              id="jobId"
              placeholder="Enter Job ID"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              value={getAnalysisJobformValues.jobId}
              onChange={(e) => onGetAnalysisJobFormChange(e)}
            />
          </div>
          <div className="mb-6">
            <CtaButton copy="Get Analysis Job" />
          </div>
        </form>
      </div>
      <h3 className="mt-6 text-xl">Analysis Jobs</h3>
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
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Postcode
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Transaction price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Complete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!!analysisJobs.length &&
                    analysisJobs.map((n) => (
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(Date.parse(n.created)).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {n.postcode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {`£${n.transactionPrice}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <ProgressPill complete={n.complete} />
                          </div>
                        </td>
                      </tr>
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

export default AnalysisJobsPage
