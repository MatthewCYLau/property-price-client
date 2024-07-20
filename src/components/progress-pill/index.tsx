import { FC } from 'react'
import cn from 'classnames'

interface Props {
  complete: boolean
}

const ProgressPill: FC<Props> = ({ complete }) => {
  return (
    <span
      className={cn(
        'inline-flex px-2 text-xs font-semibold leading-5 rounded-full',
        {
          'text-yellow-800 bg-yellow-100': !complete,
          'text-green-800 bg-green-100': complete
        }
      )}
    >
      {complete ? 'Complete' : 'In progress'}
    </span>
  )
}

export default ProgressPill
