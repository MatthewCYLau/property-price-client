import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import HomePage from '../pages/home'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import { useContext } from 'react'
import { Store } from '../store'
import AddPropertyPage from '../pages/add-property'

type PrivateRouteProps = {
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component
}) => {
  const { state } = useContext(Store)
  if (state.isAuthenticated) return <Component />
  return <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <PrivateRoute component={DashboardPage} />
  },
  {
    path: '/add-property',
    element: <PrivateRoute component={AddPropertyPage} />
  },
  {
    path: '/*',
    element: <HomePage />
  }
])
