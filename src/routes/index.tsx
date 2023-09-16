import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import HomePage from '../pages/home'
import { useContext } from 'react'

type PrivateRouteProps = {
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component
}) => {
  if (true) return <Component />
  return <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <HomePage />
  }
])
