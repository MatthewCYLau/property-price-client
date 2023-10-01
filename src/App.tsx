import { RouterProvider } from 'react-router-dom'
import { ReactElement } from 'react'
import { StoreProvider } from './store'
import AuthWrapper from './components/auth-wrapper'
import { router } from './routes'
import Alert from './components/alert'

const App = (): ReactElement => {
  return (
    <>
      <StoreProvider>
        <AuthWrapper>
          <Alert />
          <RouterProvider router={router} />
        </AuthWrapper>
      </StoreProvider>
    </>
  )
}

export default App
