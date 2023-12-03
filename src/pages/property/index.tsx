import {
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
  useContext
} from 'react'
import api from '../../utils/api'
import { Store } from '../../store'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { Property, PriceAnalysis, ModalActionType } from '../../types'
import { ActionType as AlertActionType } from '../../store/alert/action-types'
import PropertyCard from '../../components/property-card'
import CtaButton from '../../components/cta-button'
import PriceAnalysisCard from '../../components/price-analysis-card'

interface Values {
  differenceInPercentage: number
  note: string
}

const PropertyPage = (): ReactElement => {
  const { dispatch, state } = useContext(Store)
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    differenceInPercentage: 0,
    note: ''
  })
  const [property, setProperty] = useState<Property>({
    id: '',
    created: '',
    listingUrl: '',
    askingPrice: 0,
    address: '',
    userId: '',
    avatarId: 1
  })

  const [priceAnalysis, setPriceAnalysis] = useState<PriceAnalysis>({
    suggestedPrice: 0,
    percentageDifferenceFromAskingPrice: 0
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getPropertyById = async (id: string) => {
    setIsLoading(true)
    try {
      const { data }: AxiosResponse<Property> = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${id}`
      )
      setProperty(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getPriceAnalysisByPropertyId = async (id: string) => {
    setIsLoading(true)
    try {
      const { data }: AxiosResponse<PriceAnalysis> = await api.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/properties/${id}/price-analysis`
      )
      setPriceAnalysis(data)
    } catch (err) {
      console.log(err)
    }
  }

  const deletePropertyById = async (id: string) => {
    try {
      await api.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/${id}`
      )
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnPropertyDelete = (id: string) => {
    dispatch({
      type: ModalActionType.SET_MODAL,
      payload: {
        message: 'Do you want to delete property?',
        onCancel: () => dispatch({ type: ModalActionType.REMOVE_MODAL }),
        onConfirm: () => {
          dispatch({ type: ModalActionType.REMOVE_MODAL })
          deletePropertyById(id)
        }
      }
    })
  }

  const handleOnPropertyUpdate = (id: string) => {
    console.log(`Updating property with ${id}...`)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/price-suggestions`,
        {
          differenceInPercentage: +formValues.differenceInPercentage,
          note: formValues.note,
          propertyId: id
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      navigate('/dashboard')
    } catch (err: any) {
      const error: Error = err.response.data
      dispatch({
        type: AlertActionType.SET_ALERT,
        payload: { id: uuid(), message: error.message, severity: 'error' }
      })
    }
  }

  const decrementHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFormValues((prevState) => ({
      ...prevState,
      differenceInPercentage: prevState.differenceInPercentage - 1
    }))
  }

  const incrementHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFormValues((prevState) => ({
      ...prevState,
      differenceInPercentage: prevState.differenceInPercentage + 1
    }))
  }

  useEffect(() => {
    id && getPropertyById(id)
    id && getPriceAnalysisByPropertyId(id)
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <PropertyCard
              listingUrl={property.listingUrl}
              address={property.address}
              price={property.askingPrice}
              created={new Date(Date.parse(property.created)).toDateString()}
              deletePropertyHandler={() => handleOnPropertyDelete(property.id)}
              updatePropertyHandler={() => handleOnPropertyUpdate(property.id)}
              currentUserIsPropertyCreator={property.userId === state.user.id}
              avatarId={property.avatarId}
            />
          </>
        )}
        <PriceAnalysisCard
          suggestedPrice={priceAnalysis.suggestedPrice}
          percentageDifferenceFromAskingPrice={
            priceAnalysis.percentageDifferenceFromAskingPrice
          }
          askingPrice={property.askingPrice}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <form className="h-10" onSubmit={submitHandler}>
          <label className="block text-gray-700">
            Offer price suggestion (% from asking)
          </label>
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 mb-6">
            <button
              onClick={decrementHandler}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              name="differenceInPercentage"
              id="differenceInPercentage"
              className="outline-none focus:outline-none text-center w-1/2 bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700  outline-none"
              value={formValues.differenceInPercentage}
              onChange={(e) => onChange(e)}
            ></input>
            <button
              onClick={incrementHandler}
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/4 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
          <label className="block text-gray-700">Tell us why</label>
          <input
            type="text"
            placeholder="Tell us why"
            name="note"
            id="note"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            value={formValues.note}
            onChange={(e) => onChange(e)}
          />
          <CtaButton copy="Submit suggestion" />
        </form>
      </div>
    </Layout>
  )
}

export default PropertyPage
