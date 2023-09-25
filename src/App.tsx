import { RouterProvider } from 'react-router-dom'
import { ReactElement } from 'react'
import { StoreProvider } from './store'
import AuthWrapper from './components/auth-wrapper'
import { router } from './routes'

const App = (): ReactElement => {
  return (
    <>
      <StoreProvider>
        <AuthWrapper>
          <RouterProvider router={router} />
        </AuthWrapper>
      </StoreProvider>
    </>
  )
}

export default App
