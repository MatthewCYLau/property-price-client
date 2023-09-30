import { FC } from 'react'
import cn from 'classnames'

interface Props {
  suggestedPrice: number
  percentageDifferenceFromAskingPrice: number
  askingPrice: number
}

const PriceAnalysisCard: FC<Props> = ({
  suggestedPrice,
  percentageDifferenceFromAskingPrice,
  askingPrice
}) => {
  return (
    <div className="flex flex-col justify-center">
      <h5 className="text-xl text-gray-600 text-center">
        Suggested offer price
      </h5>
      <div className="mt-2 flex justify-center gap-4">
        <h3 className="text-3xl font-bold text-gray-700">{`£${suggestedPrice.toLocaleString()}`}</h3>
        <div
          className={cn('flex items-end gap-1 ', {
            'text-red-500': percentageDifferenceFromAskingPrice < 0,
            'text-green-500': percentageDifferenceFromAskingPrice > 0,
            'text-yellow-500': percentageDifferenceFromAskingPrice == 0
          })}
        >
          <svg
            className={cn('w-3', {
              'rotate-180 -translate-y-1.5':
                percentageDifferenceFromAskingPrice < 0,
              hidden: percentageDifferenceFromAskingPrice == 0
            })}
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
              fill="currentColor"
            />
          </svg>
          <span>{`${percentageDifferenceFromAskingPrice}%`}</span>
        </div>
      </div>
      <span className="block text-center text-gray-500">
        {`${
          suggestedPrice === askingPrice ? 'Same as' : 'Compared to'
        } asking price £${askingPrice.toLocaleString()}`}
      </span>
    </div>
  )
}

export default PriceAnalysisCard
