import { useContext } from 'react'
import { ActionType as AlertActionType } from '../../store/alert/action-types'
import { Store } from '../../store'

const Alert = () => {
  const { state, dispatch } = useContext(Store)

  const handleAlertOnClick = (id: string) => {
    dispatch({
      type: AlertActionType.REMOVE_ALERT,
      payload: id
    })
  }

  return (
    <div>
      {state.alerts !== null &&
        state.alerts.length > 0 &&
        state.alerts.map((alert) => (
          <div
            className="font-regular absolute block w-full bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
            data-dismissible="alert"
          >
            <div className="mr-12">{alert.message}</div>
            <div
              className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
              data-dismissible-target="alert"
            >
              <button
                onClick={() => handleAlertOnClick(alert.id)}
                role="button"
                className="w-max rounded-lg p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Alert
