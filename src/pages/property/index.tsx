import { ReactElement, useState, useEffect, ChangeEvent } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { useParams } from 'react-router-dom'
import Layout from '../../components/layout'
import Loader from '../../components/loader'
import { Property, PriceAnalysis } from '../../types'
import PropertyCard from '../../components/property-card'
import CtaButton from '../../components/cta-button'

interface Values {
  differenceInPercentage: number
}

const PropertyPage = (): ReactElement => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState<Values>({
    differenceInPercentage: 0
  })
  const [property, setProperty] = useState<Property>({
    id: '',
    created: '',
    listingUrl: '',
    askingPrice: 0,
    address: ''
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
          propertyId: id
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
            />
          </>
        )}
        <div className="flex flex-col	justify-center	">
          <h5 className="text-xl text-gray-600 text-center">
            Suggested offer price
          </h5>
          <div className="mt-2 flex justify-center gap-4">
            <h3 className="text-3xl font-bold text-gray-700">{`£${priceAnalysis.suggestedPrice.toLocaleString()}`}</h3>
            <div className="flex items-end gap-1 text-red-500">
              <svg
                className="w-3 rotate-180	-translate-y-1.5"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                  fill="currentColor"
                />
              </svg>
              <span>{`${priceAnalysis.percentageDifferenceFromAskingPrice}%`}</span>
            </div>
          </div>
          <span className="block text-center text-gray-500">
            {`Compared to asking price £${property.askingPrice.toLocaleString()}`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <form className="h-10" onSubmit={submitHandler}>
          <label className="block text-gray-700">
            Offer price suggestion (% from asking)
          </label>
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
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
          <CtaButton copy="Submit suggestion" />
        </form>
      </div>
    </Layout>
  )
}

export default PropertyPage
