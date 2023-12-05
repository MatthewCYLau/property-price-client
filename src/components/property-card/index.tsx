import { FC } from 'react'
import CtaButton from '../../components/cta-button'
import { Link } from 'react-router-dom'

interface Props {
  address: string
  listingUrl?: string
  price: number
  created: string
  currentUserIsPropertyCreator?: boolean
  deletePropertyHandler?: () => void
  updatePropertyHandler?: () => void
  avatarUrl: string
}

const isNewProperty = (created: string) => {
  const current = new Date()
  const propertyCreatedDate = new Date(Date.parse(created))
  const duration = current.valueOf() - propertyCreatedDate.valueOf()
  const hours = Math.floor(duration / (60 * 60 * 1000))
  return hours < 24
}

const getAvatarImage = (avatarUrl: string) => {
  const imageFormats = ['jpeg', 'png']
  if (imageFormats.some((n) => avatarUrl.includes(n))) {
    return avatarUrl
  } else {
    return `/house-${avatarUrl.toString()}.png`
  }
}

const PropertyCard: FC<Props> = ({
  address,
  price,
  created,
  currentUserIsPropertyCreator = false,
  listingUrl,
  deletePropertyHandler,
  updatePropertyHandler,
  avatarUrl
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
        <img
          className="w-1/4 h-1/4"
          src={getAvatarImage(avatarUrl)}
          alt="house"
        />
      </div>
      <div>
        {isNewProperty(created) && (
          <span className="inline-block px-2 text-sm text-white bg-green-300 rounded mr-2">
            New!
          </span>
        )}
        <span>{created}</span>
      </div>
      {listingUrl && (
        <Link target="_blank" to={listingUrl}>
          <CtaButton copy="View property listing" type="button" />
        </Link>
      )}
      {updatePropertyHandler && currentUserIsPropertyCreator && (
        <CtaButton
          copy="Update property listing"
          type="button"
          onClickHandler={updatePropertyHandler}
        />
      )}
      {deletePropertyHandler && currentUserIsPropertyCreator && (
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
