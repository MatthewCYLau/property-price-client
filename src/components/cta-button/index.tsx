import { FC } from 'react'
import cn from 'classnames'

type ButtonType = 'submit' | 'button'
interface Props {
  copy: string
  onClickHandler?: () => void
  disableSubmit?: boolean
  type?: ButtonType
}

const CtaButton: FC<Props> = ({
  copy,
  onClickHandler,
  disableSubmit = false,
  type = 'submit'
}) => {
  return (
    <button
      onClick={onClickHandler}
      disabled={disableSubmit}
      type={type}
      className={cn(
        'w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6',
        {
          'bg-red-400 hover:bg-red-300 focus:bg-red-300': copy
            .toLowerCase()
            .includes('delete')
        },
        {
          'bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400': copy
            .toLowerCase()
            .includes('update')
        }
      )}
    >
      {copy}
    </button>
  )
}

export default CtaButton
