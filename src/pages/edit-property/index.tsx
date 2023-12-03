import { ReactElement, useState, ChangeEvent, useEffect } from 'react'
import api from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { Property } from '../../types'
import CtaButton from '../../components/cta-button'
import CheckIcon from '../../components/icons/check-icon'
import Layout from '../../components/layout'
import Loader from '../../components/loader'

interface Values {
  listingUrl: string
  askingPrice: number
  address: string
}

const EditPropertyPage = (): ReactElement => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formValues, setFormValues] = useState<Values>({
    listingUrl: '',
    askingPrice: 0,
    address: ''
  })
  const [avatarImageUrl, setAvatarImageUrl] = useState<string>('')
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const uploadFile = async () => {
    setUploadSuccess(false)
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      const { data } = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setAvatarImageUrl(data.asset_url)
      setUploadSuccess(true)
    }
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties`,
        {
          listingUrl: formValues.listingUrl,
          askingPrice: +formValues.askingPrice,
          address: formValues.address
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  const getPropertyById = async (id: string) => {
    setIsLoading(true)
    try {
      const { data }: AxiosResponse<Property> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${id}`
      )
      setFormValues({
        listingUrl: data.listingUrl,
        askingPrice: data.askingPrice,
        address: data.address
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    uploadFile()
  }, [file])

  useEffect(() => {
    id && getPropertyById(id)
  }, [])

  console.log(avatarImageUrl)

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="block text-gray-700">
                Property listing URL
              </label>
              <input
                type="text"
                placeholder="https://www.rightmove.co.uk/properties/137704190"
                name="listingUrl"
                id="listingUrl"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formValues.listingUrl}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Asking price</label>
              <input
                type="text"
                placeholder="Asking price"
                name="askingPrice"
                id="askingPrice"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formValues.askingPrice}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Montpelier Road, Sutton, London"
                name="address"
                id="address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formValues.address}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Avatar image</label>
              <div className="flex justify-between	">
                <input
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                />
                {uploadSuccess && <CheckIcon />}
              </div>
            </div>
            <div className="mb-6">
              <CtaButton copy="Add Property" />
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default EditPropertyPage
