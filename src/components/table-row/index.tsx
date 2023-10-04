import { FC } from 'react'
import PricePill from '../price-pill/index'
import DeleteIcon from '../icons/delete-icon'

interface Props {
  id: string
  address: string
  askingPrice: number
  differenceInPercentage: number
  note: string
  renderDeleteButton: boolean
  onDeleteHandler: () => void
}

const TableRow: FC<Props> = ({
  address,
  askingPrice,
  differenceInPercentage,
  note,
  renderDeleteButton = false,
  onDeleteHandler
}) => {
  return (
    <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{address}</div>
          <div className="text-sm text-gray-500">London</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {`£${askingPrice.toLocaleString()}`}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {`${differenceInPercentage}%`}
        </div>
        <PricePill differenceInPercentage={differenceInPercentage} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{note}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {renderDeleteButton && (
          <button onClick={onDeleteHandler} className="hover:text-white">
            <DeleteIcon />
          </button>
        )}
      </td>
    </tr>
  )
}

export default TableRow
