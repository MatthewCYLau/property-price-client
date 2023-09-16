import { RouterProvider } from 'react-router-dom'
import { ReactElement } from 'react'
import { router } from './routes'

const App = (): ReactElement => {
  return <RouterProvider router={router} />
}

export default App
