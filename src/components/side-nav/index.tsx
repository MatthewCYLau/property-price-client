import { FC, ReactNode, useContext } from 'react'
import { Store } from '../../store'
import { ActionType as AuthActionType } from '../../store/auth/action-types'
import LogoutIcon from '../icons/logout-icon'
import HomeIcon from '../icons/home-icon'
import DocumentIcon from '../icons/document-icon'
import CogwheelIcon from '../icons/cogwheel-icon'
import SideNavButton from '../side-nav-button'
import ChartIcon from '../icons/chart-icon'

const sideNavButtons: {
  toUrl: string
  iconComponent: ReactNode
  copy: string
}[] = [
  { toUrl: '/dashboard', iconComponent: <HomeIcon />, copy: 'Dashboard' },
  {
    toUrl: '/add-property',
    iconComponent: <DocumentIcon />,
    copy: 'Add Property'
  },
  {
    toUrl: '/update-user',
    iconComponent: <CogwheelIcon />,
    copy: 'Update User'
  },
  {
    toUrl: '/statistics',
    iconComponent: <ChartIcon />,
    copy: 'Statistics'
  }
]

const Sidebar: FC = () => {
  const { dispatch } = useContext(Store)
  const logout = () => dispatch({ type: AuthActionType.LOGOUT })

  return (
    <aside className="hidden inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform shadow-lg z-auto md:block md:static shadow">
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          P' Price Engine
        </span>
      </div>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        <ul className="p-2 overflow-hidden">
          {sideNavButtons.map((n, index) => (
            <SideNavButton
              key={index}
              index={index}
              toUrl={n.toUrl}
              iconComponent={n.iconComponent}
              copy={n.copy}
            />
          ))}
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
            >
              <span>
                <LogoutIcon />
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
