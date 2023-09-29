import { FC } from 'react'
import cn from 'classnames'

interface Props {
  differenceInPercentage: number
}

const PricePill: FC<Props> = ({ differenceInPercentage }) => {
  return (
    <span
      className={cn(
        'inline-flex px-2 text-xs font-semibold leading-5 rounded-full',
        {
          'text-red-800 bg-red-100': differenceInPercentage < 0,
          'text-green-800 bg-green-100': differenceInPercentage > 0,
          'text-yellow-800 bg-yellow-100': differenceInPercentage == 0
        }
      )}
    >
      {differenceInPercentage < 0
        ? 'Below asking'
        : differenceInPercentage > 0
        ? 'Above asking'
        : 'Asking'}
    </span>
  )
}

export default PricePill
