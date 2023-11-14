import { useContext, FC } from 'react'
import { ActionType as NotificationActionType } from '../../store/notification/action-types'
import { Notification } from '../../types'
import { Store } from '../../store'
import NotificationDropdownItem from '../notification-dropdown-item'

interface Props {
  notifications: Notification[]
}

const NotificationDropdown: FC<Props> = ({ notifications }) => {
  const { dispatch } = useContext(Store)
  const onClickHandler = (id: string) => {
    dispatch({
      type: NotificationActionType.REMOVE_NOTIFICATION,
      payload: id
    })
  }
  return (
    <div className="origin-top-right absolute right-full top-2/3 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {notifications.map((n) => (
        <NotificationDropdownItem
          key={n.id}
          copy="Some notification"
          onClickHandler={() => onClickHandler(n.id)}
        />
      ))}
    </div>
  )
}

export default NotificationDropdown
