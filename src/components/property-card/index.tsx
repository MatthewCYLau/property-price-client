import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  address: string
  listingUrl?: string
  price: number
  created: string
}

const PropertyCard: FC<Props> = ({ address, price, created, listingUrl }) => {
  return (
    <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-2">
          <span className="text-gray-400">{address}</span>
          <span className="text-lg font-semibold">
            {`£${price.toLocaleString()}`}
          </span>
        </div>
        <div className="p-10 bg-gray-200 rounded-md"></div>
      </div>
      <div>
        <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">
          New!
        </span>
        <span>{created}</span>
      </div>
      {listingUrl && (
        <Link target="_blank" to={listingUrl}>
          <button
            className="w-2/3 block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white rounded-lg
              px-4 py-3 mt-6"
          >
            View property listing
          </button>
        </Link>
      )}
    </div>
  )
}

export default PropertyCard
