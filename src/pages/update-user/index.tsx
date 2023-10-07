import { ReactElement } from 'react'
import Layout from '../../components/layout'

const UpdateUserPage = (): ReactElement => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <h1>Update User</h1>
      </div>
    </Layout>
  )
}

export default UpdateUserPage
