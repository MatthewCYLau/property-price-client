import { ReactElement, useState, ChangeEvent } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import CtaButton from '../../components/cta-button'
import Layout from '../../components/layout'
interface Values {
  listingUrl: string
  askingPrice: number
  address: string
}

const EditPropertyPage = (): ReactElement => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    listingUrl: '',
    askingPrice: 0,
    address: ''
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <h1>Edit Property</h1>
      </div>
    </Layout>
  )
}

export default EditPropertyPage
