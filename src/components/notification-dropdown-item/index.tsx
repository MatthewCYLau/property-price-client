import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  copy: string
  onClickHandler: () => void
}

const NotificationDropdownItem: FC<Props> = ({ copy, onClickHandler }) => {
  return (
    <div className="py-2 p-2 flex w-72 hover:bg-gray-100 active:bg-blue-100">
      <Link to={`/properties/653a828ee5617fe138fd9ee3`}>
        <span className="flex block rounded-md pl-2 py-2 text-sm text-gray-700">
          {copy}
        </span>
      </Link>
      <button onClick={onClickHandler}>
        <svg
          className="h-6 w-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default NotificationDropdownItem
