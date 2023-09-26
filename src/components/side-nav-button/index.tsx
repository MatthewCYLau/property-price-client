import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  index: number
  toUrl: string
  iconComponent: ReactNode
  copy: string
}

const SideNavButton: FC<Props> = ({ index, toUrl, iconComponent, copy }) => {
  return (
    <ul key={index} className="p-2 overflow-hidden">
      <li>
        <Link
          to={toUrl}
          className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
        >
          <span>{iconComponent}</span>
          <span>{copy}</span>
        </Link>
      </li>
    </ul>
  )
}

export default SideNavButton