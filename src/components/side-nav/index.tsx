import { FC } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../home-icon'
import DocumentIcon from '../document-icon'

const Sidebar: FC = () => {
  return (
    <aside className="hidden inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg z-auto md:block md:static shadow">
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          P' Price Engine
        </span>
      </div>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        <ul className="p-2 overflow-hidden">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
            >
              <span>
                <HomeIcon />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul className="p-2 overflow-hidden">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
            >
              <span>
                <DocumentIcon />
              </span>
              <span>Add Property</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
