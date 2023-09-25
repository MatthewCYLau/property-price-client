import { FC } from 'react'
import { Link } from 'react-router-dom'
import GithubIcon from '../../components/github-icon'

const TopNav: FC = () => {
  return (
    <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
      <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
      <div className="space-y-6 md:space-x-2 md:space-y-0">
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
  )
}

export default TopNav
