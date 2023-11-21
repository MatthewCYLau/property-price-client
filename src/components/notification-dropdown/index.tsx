import { useContext, FC } from 'react'
import api from '../../utils/api'
import { ActionType as NotificationActionType } from '../../store/notification/action-types'
import {
  Notification,
  NotificationType,
  notificationCopyMap
} from '../../types'
import { Store } from '../../store'
import NotificationDropdownItem from '../notification-dropdown-item'

interface Props {
  notifications: Notification[]
}

const NotificationDropdown: FC<Props> = ({ notifications }) => {
  const { dispatch } = useContext(Store)
  const updateNotificationAsRead = async (id: string) => {
    try {
      await api.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/notifications/${id}`,
        {
          readStatus: true
        },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )
      dispatch({
        type: NotificationActionType.REMOVE_NOTIFICATION,
        payload: id
      })
    } catch (err: any) {
      console.log(err)
    }
  }

  const generateCopy = (notificationType: NotificationType): string => {
    return `You've received an ${notificationCopyMap[notificationType]} price suggestion`
  }
  return (
    <div className="origin-top-right absolute right-full top-2/3 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {notifications.map((n) => (
        <NotificationDropdownItem
          key={n.id}
          copy={generateCopy(n.notificationType)}
          onClickHandler={() => updateNotificationAsRead(n.id)}
          propertyId={n.propertyId}
        />
      ))}
    </div>
  )
}

export default NotificationDropdown
