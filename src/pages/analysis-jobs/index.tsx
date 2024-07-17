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
            <label className="block text-gray-700">Postcode</label>
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
    </Layout>
  )
}

export default AnalysisJobsPage
