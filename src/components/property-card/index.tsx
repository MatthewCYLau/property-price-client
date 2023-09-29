import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  address: string
  price: number
  created: string
}

const PropertyCard: FC<Props> = ({ id, address, price, created }) => {
  return (
    <Link
      to={`/properties/${id}`}
      className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
    >
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
    </Link>
  )
}

export default PropertyCard
