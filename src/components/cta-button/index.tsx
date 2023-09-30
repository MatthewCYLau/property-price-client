import { FC } from 'react'

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
      className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white rounded-lg
              px-4 py-3 mt-6"
    >
      {copy}
    </button>
  )
}

export default CtaButton
