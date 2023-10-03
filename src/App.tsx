import { RouterProvider } from 'react-router-dom'
import { ReactElement } from 'react'
import { StoreProvider } from './store'
import AuthWrapper from './components/auth-wrapper'
import { router } from './routes'
import Modal from './components/modal'
import Alert from './components/alert'

const App = (): ReactElement => {
  return (
    <>
      <StoreProvider>
        <AuthWrapper>
          <Modal />
          <Alert />
          <RouterProvider router={router} />
        </AuthWrapper>
      </StoreProvider>
    </>
  )
}

export default App
