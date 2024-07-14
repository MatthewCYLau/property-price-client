import { ReactElement, useState, useContext, ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store'
import Layout from '../../components/layout'
import CtaButton from '../../components/cta-button'
import { ActionType as AlertActionType } from '../../store/alert/action-types'

interface Values {
  postcode: string
}

const AnalysisJobsPage = (): ReactElement => {
  const { dispatch } = useContext(Store)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    postcode: ''
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      navigate('/dashboard')
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700">Postcode</label>
            <input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="Enter Postcode"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              value={formValues.postcode}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <CtaButton copy="Create Analysis Job" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default AnalysisJobsPage
