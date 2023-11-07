import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import GithubIcon from '../../components/icons/github-icon'
import { NotificationIcon } from '../icons/notification-icon'

const getHeader = (path: string): string => {
  if (path.includes('add-property')) {
    return 'Add Property'
  } else if (path.includes('update-user')) {
    return 'Update User'
  }
  return 'Dashboard'
}

const TopNav: FC = () => {
  const location = useLocation()
  return (
    <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
      <h1 className="text-2xl font-semibold whitespace-nowrap">
        {getHeader(location.pathname)}
      </h1>
      <div className="flex">
        <NotificationIcon />
        <div className="space-y-6 md:space-x-2 md:space-y-0 ml-2">
          <Link
            to="https://github.com/MatthewCYLau/property-price-client"
            className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-gray-200 rounded-md shadow hover:bg-opacity-20"
          >
            <span>
              <GithubIcon />
            </span>
            <span>View on Github</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopNav
