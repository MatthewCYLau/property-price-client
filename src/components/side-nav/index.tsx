import { FC, ReactNode } from 'react'
import HomeIcon from '../home-icon'
import DocumentIcon from '../document-icon'
import SideNavButton from '../side-nav-button'

const sideNavButtons: {
  toUrl: string
  iconComponent: ReactNode
  copy: string
}[] = [
  { toUrl: '/dashboard', iconComponent: <HomeIcon />, copy: 'Dashboard' },
  { toUrl: '/dashboard', iconComponent: <DocumentIcon />, copy: 'Add Property' }
]

const Sidebar: FC = () => {
  return (
    <aside className="hidden inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg z-auto md:block md:static shadow">
      <div className="flex items-center justify-between flex-shrink-0 p-2">
        <span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
          P' Price Engine
        </span>
      </div>
      <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
        {sideNavButtons.map((n, index) => (
          <SideNavButton
            index={index}
            toUrl={n.toUrl}
            iconComponent={n.iconComponent}
            copy={n.copy}
          />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
