import { FC } from 'react'

interface Props {
  copy: string
  onClickHandler: () => void
}

const NotificationDropdownItem: FC<Props> = ({ copy = 2, onClickHandler }) => {
  return (
    <div className="py-2 p-2 flex hover:bg-gray-100 active:bg-blue-100">
      <span className="flex block rounded-md px-4 py-2 text-sm text-gray-700">
        {copy}
      </span>
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default NotificationDropdownItem