import NotificationDropdownItem from '../notification-dropdown-item'

const NotificationDropdown = () => {
  const array = ['', '']
  return (
    <div className="origin-top-right absolute right-full top-2/3 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {array.map((_, index) => (
        <NotificationDropdownItem
          key={index}
          copy="Some notification"
          onClickHandler={() => console.log('close')}
        />
      ))}
    </div>
  )
}

export default NotificationDropdown
