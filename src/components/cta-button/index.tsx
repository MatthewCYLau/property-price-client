import { FC } from 'react'
import * as cn from 'classnames'

interface Props {
  copy: string
  isPrimaryCta?: boolean
  onClickHandler: () => void
}

const CtaButton: FC<Props> = ({
  copy,
  onClickHandler,
  isPrimaryCta = false
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={cn(
        'inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center mr-3 last:mr-0',
        {
          'text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900':
            isPrimaryCta,
          'text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800':
            !isPrimaryCta
        }
      )}
    >
      {copy}
    </button>
  )
}

export default CtaButton
