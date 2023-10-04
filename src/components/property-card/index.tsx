import { FC } from 'react'
import CtaButton from '../../components/cta-button'
import { Link } from 'react-router-dom'

interface Props {
  address: string
  listingUrl?: string
  price: number
  created: string
  renderDeleteButton: boolean
  deletePropertyHandler?: () => void
}

const PropertyCard: FC<Props> = ({
  address,
  price,
  created,
  renderDeleteButton = false,
  listingUrl,
  deletePropertyHandler
}) => {
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
          <CtaButton copy="View property listing" type="button" />
        </Link>
      )}
      {deletePropertyHandler && renderDeleteButton && (
        <CtaButton
          copy="Delete property listing"
          type="button"
          onClickHandler={deletePropertyHandler}
        />
      )}
    </div>
  )
}

export default PropertyCard
